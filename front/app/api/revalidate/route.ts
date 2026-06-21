import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { REVALIDATION_SECRET } from '@/lib/strapi/config';
import { CACHE_TAGS } from '@/lib/strapi/cache';

interface StrapiWebhookPayload {
  event:
    | 'entry.create'
    | 'entry.update'
    | 'entry.delete'
    | 'entry.publish'
    | 'entry.unpublish';
  createdAt: string;
  model: string;
  uid: string;
  entry: {
    id: number;
    documentId: string;
    slug?: string;
    [key: string]: unknown;
  };
}

const MODEL_TAG_MAP: Record<string, string> = {
  test: CACHE_TAGS.test,
  global: CACHE_TAGS.global,
};

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const payload = (await req.json()) as StrapiWebhookPayload;
    const { model, entry } = payload;

    const collectionTag = MODEL_TAG_MAP[model];
    if (collectionTag) {
      revalidateTag(collectionTag, 'max');
      console.log(`[revalidate] tag: ${collectionTag}`);
    }

    if (entry?.slug && model === 'test') {
      const entryTag = CACHE_TAGS.testBySlug(entry.slug);
      revalidateTag(entryTag, 'max');
      revalidatePath(`/test/${entry.slug}`);
      console.log(`[revalidate] tag: ${entryTag}`);
    }

    return NextResponse.json({
      revalidated: true,
      model,
      event: payload.event,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[revalidate] error', err);
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}

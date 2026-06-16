'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MicrosoftRedirect() {
  const params  = useSearchParams();
  const router  = useRouter();
  const ran     = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const jwt = params.get('access_token');
    if (!jwt) return router.replace('/login?error=missing_token');

    fetch('/api/auth/session', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ jwt }),
    })
      .then(() => router.replace('/dashboard'))
      .catch(() => router.replace('/login?error=session_failed'));

  }, [params, router]);

  return <p>Signing you in…</p>;
}
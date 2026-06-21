// ─── Fluent query builder ────────────────────────────────────────────────────

export class StrapiQuery {
  private q: Record<string, unknown> = {};

  populate(value: unknown) {
    this.q.populate = value;
    return this;
  }

  filters(value: Record<string, unknown>) {
    this.q.filters = value;
    return this;
  }

  sort(value: string | string[]) {
    this.q.sort = value;
    return this;
  }

  fields(value: string[]) {
    this.q.fields = value;
    return this;
  }

  pagination(value: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
    withCount?: boolean;
  }) {
    this.q.pagination = value;
    return this;
  }

  status(value: 'published' | 'draft') {
    this.q.status = value;
    return this;
  }

  locale(value: string) {
    this.q.locale = value;
    return this;
  }

  build(): Record<string, unknown> {
    return this.q;
  }
}

export const createQuery = () => new StrapiQuery();

// ─── Populate presets ─────────────────────────────────────────────────────────

// Granular populate for shared.carousel (Strapi v5 "on" syntax)
export const CAROUSEL_POPULATE = {
  'shared.carousel': {
    populate: {
      items: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          badge: true,
        },
      },
    },
  },
};

// Dynamic zone populate — add more components to `on` as needed
export const SECTIONS_POPULATE = {
  sections: {
    on: {
      ...CAROUSEL_POPULATE,
      // "shared.hero": { populate: { ... } },
    },
  },
};

// Full test entry populate
export const TEST_POPULATE = createQuery()
  .fields(['title', 'slug', 'createdAt', 'updatedAt', 'publishedAt'])
  .populate(SECTIONS_POPULATE)
  .build();

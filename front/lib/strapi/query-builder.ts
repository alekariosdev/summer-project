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

// Granular populate for article.masonry-list blocks
export const MASONRY_LIST_POPULATE = {
  'article.masonry-list': {
    populate: {
      header: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          ctaButton: true,
        },
      },
    },
  },
};

// Granular populate for shared.hero-slider blocks
export const HERO_SLIDER_POPULATE = {
  'shared.hero-slider': {
    populate: {
      slides: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          ctaButton: true,
        },
      },
    },
  },
};

// Granular populate for article.slideset-list blocks
export const SLIDESET_LIST_POPULATE = {
  'article.slideset-list': {
    populate: {
      header: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          ctaButton: true,
        },
      },
    },
  },
};

// Granular populate for shared.seperator blocks
export const SEPARATOR_POPULATE = {
  'shared.seperator': {
    fields: ['label', 'style', 'size', 'color', 'hideOnMobile', 'hideOnDesktop'],
  },
};

// Granular populate for shared.widget blocks
export const WIDGET_POPULATE = {
  'shared.widget': {
    populate: {
      image: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
      },
      cta: true,
    },
  },
};

// Granular populate for shared.widget-grid blocks
export const WIDGET_GRID_POPULATE = {
  'shared.widget-grid': {
    populate: {
      widgets: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          cta: true,
        },
      },
    },
  },
};

// Granular populate for article.vertical-list blocks
export const VERTICAL_ARTICLE_LIST_POPULATE = {
  'article.vertical-list': {
    populate: {
      header: {
        populate: {
          image: {
            fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
          },
          ctaButton: true,
        },
      },
    },
  },
};

export const BLOCKS_POPULATE = {
  blocks: {
    on: {
      ...MASONRY_LIST_POPULATE,
      ...HERO_SLIDER_POPULATE,
      ...SLIDESET_LIST_POPULATE,
      ...SEPARATOR_POPULATE,
      ...WIDGET_POPULATE,
      ...WIDGET_GRID_POPULATE,
      ...VERTICAL_ARTICLE_LIST_POPULATE,
    },
  },
};

export const SEO_POPULATE = {
  seo: {
    populate: {
      og_image: {
        fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
      },
    },
  },
};

// Full dynamic-page entry populate
export const DYNAMIC_PAGE_POPULATE = createQuery()
  .fields(['title', 'slug', 'createdAt', 'updatedAt', 'publishedAt'])
  .populate({
    ...BLOCKS_POPULATE,
    ...SEO_POPULATE,
  })
  .build();

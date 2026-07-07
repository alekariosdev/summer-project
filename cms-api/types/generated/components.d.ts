import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleArticlesConfig extends Struct.ComponentSchema {
  collectionName: 'components_article_articles_configs';
  info: {
    displayName: 'articles-config';
  };
  attributes: {
    articleScope: Schema.Attribute.Enumeration<['all', 'featured']> & Schema.Attribute.DefaultTo<'all'>;
    categories: Schema.Attribute.Relation<'oneToMany', 'api::category.category'>;
    companies: Schema.Attribute.Relation<'oneToMany', 'api::company.company'>;
    excludedArticles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 1;
        },
        number
      >;
    sortBy: Schema.Attribute.Enumeration<['createdAt', 'original_published_at']> & Schema.Attribute.DefaultTo<'original_published_at'>;
    sortDirection: Schema.Attribute.Enumeration<['asc', 'desc']> & Schema.Attribute.DefaultTo<'desc'>;
  };
}

export interface ArticleAuthor extends Struct.ComponentSchema {
  collectionName: 'components_article_authors';
  info: {
    displayName: 'author';
  };
  attributes: {
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ArticleExternalArticlesConfig extends Struct.ComponentSchema {
  collectionName: 'components_article_external_articles_configs';
  info: {
    displayName: 'external-articles-config';
  };
  attributes: {
    articleScope: Schema.Attribute.Enumeration<['featured', 'all']> & Schema.Attribute.DefaultTo<'all'>;
    excludedArticles: Schema.Attribute.Relation<'oneToMany', 'api::external-article.external-article'>;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    sortBy: Schema.Attribute.Enumeration<['createdAt', 'publishedAt']> & Schema.Attribute.DefaultTo<'publishedAt'>;
    sortDirection: Schema.Attribute.Enumeration<['asc', 'desc']> & Schema.Attribute.DefaultTo<'desc'>;
  };
}

export interface ArticleExternalLinksSlider extends Struct.ComponentSchema {
  collectionName: 'components_article_external_links_sliders';
  info: {
    displayName: 'external-links-slider';
  };
  attributes: {
    articles: Schema.Attribute.Component<'article.external-articles-config', false> & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface ArticleMasonryList extends Struct.ComponentSchema {
  collectionName: 'components_article_masonry_lists';
  info: {
    displayName: 'masonry-list';
  };
  attributes: {
    articles: Schema.Attribute.Component<'article.articles-config', false> & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface ArticleSlidesetList extends Struct.ComponentSchema {
  collectionName: 'components_article_slideset_lists';
  info: {
    displayName: 'slideset-list';
  };
  attributes: {
    cards: Schema.Attribute.Component<'article.articles-config', false> & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    slides: Schema.Attribute.Component<'article.articles-config', false> & Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface ArticleVerticalList extends Struct.ComponentSchema {
  collectionName: 'components_article_vertical_lists';
  info: {
    displayName: 'vertical-list';
  };
  attributes: {
    articles: Schema.Attribute.Component<'article.articles-config', false> & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface EventPeopleList extends Struct.ComponentSchema {
  collectionName: 'components_event_people_lists';
  info: {
    displayName: 'people-list';
  };
  attributes: {
    people: Schema.Attribute.Component<'event.person', true>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface EventPerson extends Struct.ComponentSchema {
  collectionName: 'components_event_people';
  info: {
    displayName: 'person';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedBadge extends Struct.ComponentSchema {
  collectionName: 'components_shared_badges';
  info: {
    displayName: 'badge';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<
      ['top-center', 'top-left', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right']
    > &
      Schema.Attribute.DefaultTo<'top-left'>;
    hex_color: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBlockHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_block_headers';
  info: {
    displayName: 'block-header';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'shared.cta-button', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContent extends Struct.ComponentSchema {
  collectionName: 'components_shared_contents';
  info: {
    displayName: 'content';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    displayName: 'cta-button';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<['_self', '_blank']>;
    url: Schema.Attribute.String;
  };
}

export interface SharedFullImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_full_images';
  info: {
    displayName: 'full-image';
  };
  attributes: {
    aspectRatio: Schema.Attribute.Enumeration<['ratio_16_9', 'ratio_4_3', 'ratio_1_1', 'ratio_21_9']>;
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    content_alignment: Schema.Attribute.Enumeration<
      ['top-center', 'top-left', 'top-right', 'center-left', 'center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right']
    >;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_sliders';
  info: {
    displayName: 'hero-slider';
  };
  attributes: {
    slides: Schema.Attribute.Component<'shared.hero-slider-item', true>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
  };
}

export interface SharedHeroSliderItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_slider_items';
  info: {
    displayName: 'hero-slider-item';
  };
  attributes: {
    badgeLabel: Schema.Attribute.String;
    ctaButton: Schema.Attribute.Component<'shared.cta-button', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedImagesMosaic extends Struct.ComponentSchema {
  collectionName: 'components_shared_images_mosaics';
  info: {
    displayName: 'images-mosaic';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    target: Schema.Attribute.Enumeration<['_self', '_blank']>;
    url: Schema.Attribute.String;
  };
}

export interface SharedMap extends Struct.ComponentSchema {
  collectionName: 'components_shared_maps';
  info: {
    displayName: 'map';
  };
  attributes: {
    address: Schema.Attribute.String;
    embedUrl: Schema.Attribute.String;
    latitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    marker_label: Schema.Attribute.String;
    zoom: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<16>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    og_image: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSeperator extends Struct.ComponentSchema {
  collectionName: 'components_shared_seperators';
  info: {
    displayName: 'seperator';
  };
  attributes: {
    color: Schema.Attribute.String;
    hideOnDesktop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']>;
    style: Schema.Attribute.Enumeration<['blank', 'line', 'dashed', 'dotted']> & Schema.Attribute.DefaultTo<'blank'>;
  };
}

export interface SharedSocialEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_embeds';
  info: {
    displayName: 'social-embed';
  };
  attributes: {
    embedCode: Schema.Attribute.String;
    embedUrl: Schema.Attribute.String & Schema.Attribute.Required;
    fallbackImage: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.Enumeration<['twitter', 'linkedin', 'instagram', 'facebook', 'youtube']> & Schema.Attribute.Required;
  };
}

export interface SharedVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_videos';
  info: {
    displayName: 'video';
  };
  attributes: {
    duration: Schema.Attribute.String;
    source: Schema.Attribute.Enumeration<['youtube', 'strapi']> & Schema.Attribute.Required & Schema.Attribute.DefaultTo<'youtube'>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    uploadedVideo: Schema.Attribute.Media<'videos'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedWidget extends Struct.ComponentSchema {
  collectionName: 'components_shared_widgets';
  info: {
    displayName: 'widget';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedWidgetGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_widget_grids';
  info: {
    displayName: 'widget-grid';
  };
  attributes: {
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']> & Schema.Attribute.DefaultTo<'metlen'>;
    widgets: Schema.Attribute.Component<'shared.widghet-card-grid', true>;
  };
}

export interface SharedWidghetCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_widghet_card_grids';
  info: {
    displayName: 'widghet-card-grid';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['content', 'banner']> & Schema.Attribute.DefaultTo<'content'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.articles-config': ArticleArticlesConfig;
      'article.author': ArticleAuthor;
      'article.external-articles-config': ArticleExternalArticlesConfig;
      'article.external-links-slider': ArticleExternalLinksSlider;
      'article.masonry-list': ArticleMasonryList;
      'article.slideset-list': ArticleSlidesetList;
      'article.vertical-list': ArticleVerticalList;
      'event.people-list': EventPeopleList;
      'event.person': EventPerson;
      'shared.badge': SharedBadge;
      'shared.block-header': SharedBlockHeader;
      'shared.content': SharedContent;
      'shared.cta-button': SharedCtaButton;
      'shared.full-image': SharedFullImage;
      'shared.hero': SharedHero;
      'shared.hero-slider': SharedHeroSlider;
      'shared.hero-slider-item': SharedHeroSliderItem;
      'shared.images-mosaic': SharedImagesMosaic;
      'shared.link': SharedLink;
      'shared.map': SharedMap;
      'shared.seo': SharedSeo;
      'shared.seperator': SharedSeperator;
      'shared.social-embed': SharedSocialEmbed;
      'shared.video': SharedVideo;
      'shared.widget': SharedWidget;
      'shared.widget-grid': SharedWidgetGrid;
      'shared.widghet-card-grid': SharedWidghetCardGrid;
    }
  }
}

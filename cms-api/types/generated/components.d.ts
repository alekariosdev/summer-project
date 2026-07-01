import type { Schema, Struct } from '@strapi/strapi';

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

export interface ArticleMasonryList extends Struct.ComponentSchema {
  collectionName: 'components_article_masonry_lists';
  info: {
    displayName: 'masonry-list';
  };
  attributes: {
    articles: Schema.Attribute.JSON & Schema.Attribute.CustomField<'plugin::filtered-articles.filtered-articles'>;
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
    cards: Schema.Attribute.JSON & Schema.Attribute.CustomField<'plugin::filtered-articles.filtered-articles'>;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    slides: Schema.Attribute.JSON & Schema.Attribute.CustomField<'plugin::filtered-articles.filtered-articles'>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']>;
  };
}

export interface ArticleVerticalList extends Struct.ComponentSchema {
  collectionName: 'components_article_vertical_lists';
  info: {
    displayName: 'vertical-list';
  };
  attributes: {
    articles: Schema.Attribute.JSON & Schema.Attribute.CustomField<'plugin::filtered-articles.filtered-articles'>;
    header: Schema.Attribute.Component<'shared.block-header', false>;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']>;
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
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']>;
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

export interface SharedImageTextGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_text_grids';
  info: {
    displayName: 'image-text-grid';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<
      ['row-left-image-right-text', 'row-left-text-right-image', 'column-top-image-bottom-text', 'column-top-text-bottom-image']
    > &
      Schema.Attribute.DefaultTo<'row-left-image-right-text'>;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
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
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#e5e7eb'>;
    hideOnDesktop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    size: Schema.Attribute.Enumeration<['xs', 'sm', 'md', 'lg', 'xl']>;
    style: Schema.Attribute.Enumeration<['blank', 'line', 'dashed', 'dotted']>;
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

export interface SharedWidget extends Struct.ComponentSchema {
  collectionName: 'components_shared_widgets';
  info: {
    displayName: 'widget';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedWidgetGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_widget_grids';
  info: {
    displayName: 'widget-grid';
  };
  attributes: {
    theme: Schema.Attribute.Enumeration<['metlen', 'metka', 'protergia']>;
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
      'article.author': ArticleAuthor;
      'article.masonry-list': ArticleMasonryList;
      'article.slideset-list': ArticleSlidesetList;
      'article.vertical-list': ArticleVerticalList;
      'shared.badge': SharedBadge;
      'shared.block-header': SharedBlockHeader;
      'shared.cta-button': SharedCtaButton;
      'shared.full-image': SharedFullImage;
      'shared.hero': SharedHero;
      'shared.hero-slider': SharedHeroSlider;
      'shared.hero-slider-item': SharedHeroSliderItem;
      'shared.image-text-grid': SharedImageTextGrid;
      'shared.images-mosaic': SharedImagesMosaic;
      'shared.link': SharedLink;
      'shared.map': SharedMap;
      'shared.seo': SharedSeo;
      'shared.seperator': SharedSeperator;
      'shared.social-embed': SharedSocialEmbed;
      'shared.widget': SharedWidget;
      'shared.widget-grid': SharedWidgetGrid;
      'shared.widghet-card-grid': SharedWidghetCardGrid;
    }
  }
}

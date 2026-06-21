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

export interface SharedCarousel extends Struct.ComponentSchema {
  collectionName: 'components_shared_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['start', 'center', 'end']> & Schema.Attribute.DefaultTo<'start'>;
    autoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    dragFree: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    items: Schema.Attribute.Component<'shared.carousel-item', false>;
    loop: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    orientation: Schema.Attribute.Enumeration<['horizontal', 'vertical']> & Schema.Attribute.DefaultTo<'horizontal'>;
    showDots: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    showNavigation: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    slidesToScroll: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String;
  };
}

export interface SharedCarouselItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_carousel_items';
  info: {
    displayName: 'carousel-item';
  };
  attributes: {
    badge: Schema.Attribute.Component<'shared.badge', false>;
    image: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    displayName: 'cta-button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
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

export interface SharedHeroVideo extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_videos';
  info: {
    displayName: 'hero-video';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    videoProvider: Schema.Attribute.Enumeration<['youtube', 'vimeo', 'upload']>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SharedImageGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_grids';
  info: {
    displayName: 'image-grid';
  };
  attributes: {
    columns: Schema.Attribute.Enumeration<['two', 'three', 'four']> & Schema.Attribute.DefaultTo<'three'>;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
    layout: Schema.Attribute.Enumeration<['equal', 'masonry']> & Schema.Attribute.DefaultTo<'equal'>;
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

export interface SharedPersonCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_person_cards';
  info: {
    displayName: 'person-card';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    department: Schema.Attribute.String;
    full_name: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    job_title: Schema.Attribute.String;
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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.author': ArticleAuthor;
      'shared.badge': SharedBadge;
      'shared.carousel': SharedCarousel;
      'shared.carousel-item': SharedCarouselItem;
      'shared.cta-button': SharedCtaButton;
      'shared.full-image': SharedFullImage;
      'shared.hero': SharedHero;
      'shared.hero-video': SharedHeroVideo;
      'shared.image-grid': SharedImageGrid;
      'shared.image-text-grid': SharedImageTextGrid;
      'shared.link': SharedLink;
      'shared.map': SharedMap;
      'shared.person-card': SharedPersonCard;
      'shared.seo': SharedSeo;
      'shared.social-embed': SharedSocialEmbed;
    }
  }
}

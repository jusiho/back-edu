import type { Attribute, Schema } from '@strapi/strapi';

export interface DynamicPopup extends Schema.Component {
  collectionName: 'components_dynamic_popups';
  info: {
    description: '';
    displayName: 'popup';
    icon: 'bell';
  };
  attributes: {
    buttonText: Attribute.String;
    buttonUrl: Attribute.String;
    description: Attribute.RichText;
    dismissable: Attribute.Boolean;
    endDate: Attribute.DateTime;
    frequency: Attribute.Enumeration<
      ['oncePerSession', 'oncePerDay', 'always']
    >;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isActive: Attribute.Boolean;
    openNewTab: Attribute.Boolean;
    startDate: Attribute.DateTime;
    title: Attribute.String;
  };
}

export interface DynamicRelatedArticles extends Schema.Component {
  collectionName: 'components_dynamic_related_articles';
  info: {
    displayName: 'Related_articles';
    icon: 'crop';
  };
  attributes: {
    articles: Attribute.Relation<
      'dynamic.related-articles',
      'oneToMany',
      'api::article.article'
    >;
  };
}

export interface InstructorAnother extends Schema.Component {
  collectionName: 'components_instructor_anothers';
  info: {
    displayName: 'another';
  };
  attributes: {};
}

export interface InstructorInstructor extends Schema.Component {
  collectionName: 'components_instructor_instructors';
  info: {
    description: '';
    displayName: 'Instructor';
  };
  attributes: {
    biography: Attribute.Text;
    specialization: Attribute.String;
  };
}

export interface MarketingCourseMarketing extends Schema.Component {
  collectionName: 'components_marketing_course_marketings';
  info: {
    displayName: 'marketing';
    icon: 'lightbulb';
  };
  attributes: {};
}

export interface MarketingGroupMarketingGroupCourse extends Schema.Component {
  collectionName: 'components_marketing_group_marketing_group_courses';
  info: {
    displayName: 'Marketing Group Course';
    icon: 'chartBubble';
  };
  attributes: {
    autoCountUsers: Attribute.Boolean;
    cantUsersOffer: Attribute.Integer;
    maxUsersOffer: Attribute.Integer;
  };
}

export interface SalesSalesInvoices extends Schema.Component {
  collectionName: 'components_sales_sales_invoices';
  info: {
    description: '';
    displayName: 'sales_invoices';
  };
  attributes: {
    sales: Attribute.Relation<
      'sales.sales-invoices',
      'oneToMany',
      'api::sale.sale'
    >;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Attribute.String;
    keywords: Attribute.Text;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Attribute.String;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Attribute.String;
    structuredData: Attribute.JSON;
  };
}

export interface SpeachSpeach extends Schema.Component {
  collectionName: 'components_speach_speaches';
  info: {
    description: '';
    displayName: 'speach';
    icon: 'cube';
  };
  attributes: {
    dates_summary: Attribute.String;
    discount_pct: Attribute.Decimal;
    info_aditional: Attribute.Text;
    is_discount: Attribute.Boolean;
    kommoTag: Attribute.Integer;
    price_co_disc: Attribute.Decimal;
    price_co_orig: Attribute.Decimal;
    price_int_disc: Attribute.Decimal;
    price_int_orig: Attribute.Decimal;
    price_mx_disc: Attribute.Decimal;
    price_mx_orig: Attribute.Decimal;
    price_pe_disc: Attribute.Decimal;
    price_pe_orig: Attribute.Decimal;
    time_summary: Attribute.String;
  };
}

export interface StudentStudent extends Schema.Component {
  collectionName: 'components_student_students';
  info: {
    displayName: 'Student';
  };
  attributes: {
    about_me: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dynamic.popup': DynamicPopup;
      'dynamic.related-articles': DynamicRelatedArticles;
      'instructor.another': InstructorAnother;
      'instructor.instructor': InstructorInstructor;
      'marketing-course.marketing': MarketingCourseMarketing;
      'marketing-group.marketing-group-course': MarketingGroupMarketingGroupCourse;
      'sales.sales-invoices': SalesSalesInvoices;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'speach.speach': SpeachSpeach;
      'student.student': StudentStudent;
    }
  }
}

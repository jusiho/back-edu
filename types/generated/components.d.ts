import type { Schema, Attribute } from '@strapi/strapi';

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
    displayName: 'Instructor';
    description: '';
  };
  attributes: {
    specialization: Attribute.String;
    biography: Attribute.Text;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
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
      'dynamic.related-articles': DynamicRelatedArticles;
      'instructor.another': InstructorAnother;
      'instructor.instructor': InstructorInstructor;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'student.student': StudentStudent;
    }
  }
}

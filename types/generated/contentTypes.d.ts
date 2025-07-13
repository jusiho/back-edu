import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAnswerAnswer extends Schema.CollectionType {
  collectionName: 'answers';
  info: {
    description: '';
    displayName: 'Answer';
    pluralName: 'answers';
    singularName: 'answer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::answer.answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    isCorrect: Attribute.Boolean;
    question: Attribute.Relation<
      'api::answer.answer',
      'manyToOne',
      'api::question.question'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::answer.answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAppConfigAppConfig extends Schema.SingleType {
  collectionName: 'app_configs';
  info: {
    displayName: 'app_config';
    pluralName: 'app-configs';
    singularName: 'app-config';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    clean_localstorage: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-config.app-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::app-config.app-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    description: '';
    displayName: 'Article';
    pluralName: 'articles';
    singularName: 'article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    related_articles: Attribute.DynamicZone<['dynamic.related-articles']>;
    seo: Attribute.Component<'shared.seo'>;
    slug: Attribute.UID<'api::article.article', 'title'>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    description: '';
    displayName: 'Category';
    pluralName: 'categories';
    singularName: 'category';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    children_categories: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::category.category'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String;
    parent_category: Attribute.Relation<
      'api::category.category',
      'manyToOne',
      'api::category.category'
    >;
    slug: Attribute.UID<'api::category.category', 'name'> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCertificateCertificate extends Schema.CollectionType {
  collectionName: 'certificates';
  info: {
    description: '';
    displayName: 'Certificate';
    pluralName: 'certificates';
    singularName: 'certificate';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    certificate_image: Attribute.Media<'images'>;
    certificate_pdf: Attribute.Media<'files'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    student_course: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'api::student-course.student-course'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-F0-9]{8}-(?:[A-F0-9]{4}-){3}[A-F0-9]{12}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-F0-9]{8}-(?:[A-F0-9]{4}-){3}[A-F0-9]{12}$';
        }
      >;
  };
}

export interface ApiComplaintsBookComplaintsBook extends Schema.CollectionType {
  collectionName: 'complaints_books';
  info: {
    displayName: 'Complaints_Book';
    pluralName: 'complaints-books';
    singularName: 'complaints-book';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    complaintType: Attribute.Enumeration<['claim', 'complaint']>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::complaints-book.complaints-book',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    details: Attribute.Text;
    email: Attribute.String;
    fullName: Attribute.String;
    identityDocument: Attribute.String;
    phone: Attribute.String;
    publishedAt: Attribute.DateTime;
    request: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::complaints-book.complaints-book',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountryCountry extends Schema.CollectionType {
  collectionName: 'countries';
  info: {
    description: '';
    displayName: 'Country';
    pluralName: 'countries';
    singularName: 'country';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouponCoupon extends Schema.CollectionType {
  collectionName: 'coupons';
  info: {
    description: '';
    displayName: 'Coupon';
    pluralName: 'coupons';
    singularName: 'coupon';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    categories: Attribute.Relation<
      'api::coupon.coupon',
      'oneToMany',
      'api::category.category'
    >;
    code: Attribute.UID;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date_exp: Attribute.Date;
    description: Attribute.String;
    discount: Attribute.Decimal & Attribute.Required;
    maximum_expense: Attribute.Decimal;
    minimum_expense: Attribute.Decimal;
    products: Attribute.Relation<
      'api::coupon.coupon',
      'oneToMany',
      'api::course.course'
    >;
    qty_max: Attribute.Integer;
    qty_max_user: Attribute.Integer;
    type: Attribute.Enumeration<['percentage', 'cart', 'product']>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses';
  info: {
    description: '';
    displayName: 'Course';
    pluralName: 'courses';
    singularName: 'course';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    auto_certificate: Attribute.Boolean & Attribute.DefaultTo<false>;
    brochure_file: Attribute.Media<'images' | 'files'>;
    brochure_link: Attribute.String;
    categories: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::category.category'
    >;
    certificate_price: Attribute.Decimal;
    code: Attribute.UID;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    datevivo: Attribute.DateTime;
    description: Attribute.RichText;
    duration: Attribute.Integer;
    duration_vivo: Attribute.Integer;
    finish_date: Attribute.Date;
    finished: Attribute.Boolean & Attribute.DefaultTo<false>;
    group: Attribute.Integer;
    group_course: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'api::group-course.group-course'
    >;
    group_courses: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::group-course.group-course'
    >;
    image: Attribute.Media<'images'>;
    instructor: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    is_final_project: Attribute.Boolean & Attribute.DefaultTo<false>;
    isfree: Attribute.Boolean & Attribute.DefaultTo<false>;
    level: Attribute.Enumeration<['BASIC', 'MIDDLE', 'PRO']>;
    marketing: Attribute.Component<'marketing-course.marketing'>;
    mode: Attribute.Enumeration<['VIVO', 'RECORD']> &
      Attribute.Required &
      Attribute.DefaultTo<'RECORD'>;
    more_instructors: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    preview_video: Attribute.String;
    price: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    publishedAt: Attribute.DateTime;
    rating: Attribute.Decimal;
    ratings: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::rating.rating'
    >;
    reduced_price: Attribute.Decimal;
    seccions: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::seccion.seccion'
    >;
    seo: Attribute.Component<'shared.seo'>;
    sessions: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::session.session'
    >;
    slug: Attribute.UID<'api::course.course', 'title'>;
    speach: Attribute.Component<'speach.speach'>;
    studentsqty: Attribute.String;
    teacher: Attribute.String;
    title: Attribute.String;
    type: Attribute.Enumeration<['course', 'protocol']>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    video: Attribute.Media<'videos', true>;
  };
}

export interface ApiCurrencyCurrency extends Schema.CollectionType {
  collectionName: 'currencies';
  info: {
    displayName: 'Currency';
    pluralName: 'currencies';
    singularName: 'currency';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::currency.currency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::currency.currency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFormContactFormContact extends Schema.CollectionType {
  collectionName: 'form_contacts';
  info: {
    description: '';
    displayName: 'Form_Contact';
    pluralName: 'form-contacts';
    singularName: 'form-contact';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    country: Attribute.String;
    course: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::form-contact.form-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    education_from: Attribute.String;
    email: Attribute.String;
    lastname: Attribute.String;
    name: Attribute.String;
    phone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::form-contact.form-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGroupCourseGroupCourse extends Schema.CollectionType {
  collectionName: 'group_courses';
  info: {
    description: '';
    displayName: 'Group_Course';
    pluralName: 'group-courses';
    singularName: 'group-course';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Attribute.UID;
    course: Attribute.Relation<
      'api::group-course.group-course',
      'manyToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::group-course.group-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date_course: Attribute.DateTime;
    finish_date: Attribute.Date;
    marketing: Attribute.Component<'marketing-group.marketing-group-course'>;
    name: Attribute.String;
    numberGroup: Attribute.Integer;
    quizzes: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::quiz.quiz'
    >;
    sessions: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::session.session'
    >;
    student_courses: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::student-course.student-course'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::group-course.group-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    description: '';
    displayName: 'Invoice';
    pluralName: 'invoices';
    singularName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    currency: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'api::currency.currency'
    >;
    discount: Attribute.Decimal;
    email_sent: Attribute.Boolean & Attribute.DefaultTo<false>;
    idpayment: Attribute.String;
    method: Attribute.Enumeration<['free', 'paid']>;
    payment_method: Attribute.String;
    sales: Attribute.Relation<
      'api::invoice.invoice',
      'oneToMany',
      'api::sale.sale'
    >;
    state: Attribute.Enumeration<
      ['OUTSTANDING', 'ONHOLD', 'PAID', 'PROCESSING', 'FAILED']
    >;
    total: Attribute.Decimal;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users_permissions_user: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiIzipayIzipay extends Schema.SingleType {
  collectionName: 'izipays';
  info: {
    displayName: 'izipay';
    pluralName: 'izipays';
    singularName: 'izipay';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::izipay.izipay',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    test: Attribute.Boolean;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::izipay.izipay',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLessonLesson extends Schema.CollectionType {
  collectionName: 'lessons';
  info: {
    description: '';
    displayName: 'Lesson';
    pluralName: 'lessons';
    singularName: 'lesson';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lesson.lesson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    link_resources: Attribute.Relation<
      'api::lesson.lesson',
      'oneToMany',
      'api::link-resource.link-resource'
    >;
    mode: Attribute.Enumeration<['CONTENT', 'QUESTION']>;
    order: Attribute.Integer & Attribute.Required;
    preview: Attribute.Boolean & Attribute.DefaultTo<false>;
    provider_id: Attribute.String;
    resourses: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    seccion: Attribute.Relation<
      'api::lesson.lesson',
      'manyToOne',
      'api::seccion.seccion'
    >;
    timetext: Attribute.String;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::lesson.lesson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    video_status: Attribute.Enumeration<
      ['pending', 'uploading', 'processing', 'ready']
    >;
    videotime: Attribute.Integer;
    videourl: Attribute.String;
  };
}

export interface ApiLinkResourceLinkResource extends Schema.CollectionType {
  collectionName: 'link_resources';
  info: {
    description: '';
    displayName: 'Link_Resource';
    pluralName: 'link-resources';
    singularName: 'link-resource';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::link-resource.link-resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    lesson: Attribute.Relation<
      'api::link-resource.link-resource',
      'manyToOne',
      'api::lesson.lesson'
    >;
    link: Attribute.String;
    session: Attribute.Relation<
      'api::link-resource.link-resource',
      'manyToOne',
      'api::session.session'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::link-resource.link-resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMarketingMarketing extends Schema.SingleType {
  collectionName: 'marketings';
  info: {
    description: '';
    displayName: 'marketing';
    pluralName: 'marketings';
    singularName: 'marketing';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::marketing.marketing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    popups: Attribute.Component<'dynamic.popup', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::marketing.marketing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaypalPaypal extends Schema.SingleType {
  collectionName: 'paypals';
  info: {
    description: '';
    displayName: 'paypal';
    pluralName: 'paypals';
    singularName: 'paypal';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::paypal.paypal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    test: Attribute.Boolean;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::paypal.paypal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    description: '';
    displayName: 'Post';
    pluralName: 'posts';
    singularName: 'post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiQuestionQuestion extends Schema.CollectionType {
  collectionName: 'questions';
  info: {
    description: '';
    displayName: 'Question';
    pluralName: 'questions';
    singularName: 'question';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    answers: Attribute.Relation<
      'api::question.question',
      'oneToMany',
      'api::answer.answer'
    >;
    correct_answer: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    mode: Attribute.Enumeration<['SINGLE', 'MULTIPLE']>;
    order: Attribute.Integer;
    quiz: Attribute.Relation<
      'api::question.question',
      'manyToOne',
      'api::quiz.quiz'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuizProgressQuizProgress extends Schema.CollectionType {
  collectionName: 'quiz_progresses';
  info: {
    description: '';
    displayName: 'Quiz_Progress';
    pluralName: 'quiz-progresses';
    singularName: 'quiz-progress';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attempts: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    grade: Attribute.Decimal;
    project_files: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    quiz: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'oneToOne',
      'api::quiz.quiz'
    >;
    score: Attribute.Float;
    state: Attribute.Boolean & Attribute.DefaultTo<false>;
    student_course: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'manyToOne',
      'api::student-course.student-course'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuizQuiz extends Schema.CollectionType {
  collectionName: 'quizzes';
  info: {
    description: '';
    displayName: 'Quiz';
    pluralName: 'quizzes';
    singularName: 'quiz';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::quiz.quiz', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.RichText;
    group_course: Attribute.Relation<
      'api::quiz.quiz',
      'manyToOne',
      'api::group-course.group-course'
    >;
    max_attempts: Attribute.Integer;
    order: Attribute.Integer;
    project_files: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    question_type: Attribute.Enumeration<['multiple', 'project']>;
    questions: Attribute.Relation<
      'api::quiz.quiz',
      'oneToMany',
      'api::question.question'
    >;
    seccion: Attribute.Relation<
      'api::quiz.quiz',
      'manyToOne',
      'api::seccion.seccion'
    >;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::quiz.quiz', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiRatingRating extends Schema.CollectionType {
  collectionName: 'ratings';
  info: {
    description: '';
    displayName: 'Rating';
    pluralName: 'ratings';
    singularName: 'rating';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course: Attribute.Relation<
      'api::rating.rating',
      'manyToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    rating: Attribute.Decimal;
    text: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiSaleSale extends Schema.CollectionType {
  collectionName: 'sales';
  info: {
    description: '';
    displayName: 'Sale';
    pluralName: 'sales';
    singularName: 'sale';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course: Attribute.Relation<
      'api::sale.sale',
      'oneToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::sale.sale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    group_course: Attribute.Relation<
      'api::sale.sale',
      'oneToOne',
      'api::group-course.group-course'
    >;
    invoice: Attribute.Relation<
      'api::sale.sale',
      'manyToOne',
      'api::invoice.invoice'
    >;
    is_certificate: Attribute.Boolean & Attribute.DefaultTo<false>;
    itemType: Attribute.Enumeration<['course', 'subscription']>;
    price: Attribute.Decimal;
    subscriptionType: Attribute.Enumeration<['month', 'year']>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::sale.sale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiSeccionSeccion extends Schema.CollectionType {
  collectionName: 'seccions';
  info: {
    description: '';
    displayName: 'Seccion';
    pluralName: 'seccions';
    singularName: 'seccion';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course: Attribute.Relation<
      'api::seccion.seccion',
      'manyToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seccion.seccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    lessons: Attribute.Relation<
      'api::seccion.seccion',
      'oneToMany',
      'api::lesson.lesson'
    >;
    order: Attribute.Integer & Attribute.Required;
    quizzes: Attribute.Relation<
      'api::seccion.seccion',
      'oneToMany',
      'api::quiz.quiz'
    >;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::seccion.seccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSessionSession extends Schema.CollectionType {
  collectionName: 'sessions';
  info: {
    description: '';
    displayName: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime;
    description: Attribute.Text;
    group_course: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::group-course.group-course'
    >;
    link_resources: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::link-resource.link-resource'
    >;
    order: Attribute.Integer;
    provider_id: Attribute.String;
    resourses: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    video_status: Attribute.Enumeration<
      ['pending', 'uploading', 'processing', 'ready']
    > &
      Attribute.DefaultTo<'pending'>;
    video_url: Attribute.String;
  };
}

export interface ApiSettingSetting extends Schema.SingleType {
  collectionName: 'settings';
  info: {
    description: '';
    displayName: 'setting';
    pluralName: 'settings';
    singularName: 'setting';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    certificate_image: Attribute.Media<'images', true>;
    clean_local: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    example_certificate: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    fondo_main: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_profile: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_offer: Attribute.String;
    logo_main: Attribute.Media<'images', true>;
    odooConfig: Attribute.JSON;
    offer_active: Attribute.Boolean & Attribute.DefaultTo<false>;
    privacy_policies: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    terms_of_service: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    text_offer: Attribute.String;
    time_offer_finish: Attribute.DateTime;
    time_offer_init: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStudentCourseStudentCourse extends Schema.CollectionType {
  collectionName: 'student_courses';
  info: {
    description: '';
    displayName: 'Student_Course';
    pluralName: 'student-courses';
    singularName: 'student-course';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    certificate: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::certificate.certificate'
    >;
    course: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::course.course'
    >;
    create_user: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    final_grade: Attribute.Decimal;
    final_project: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    group_course: Attribute.Relation<
      'api::student-course.student-course',
      'manyToOne',
      'api::group-course.group-course'
    >;
    is_instructor_view: Attribute.Boolean & Attribute.DefaultTo<false>;
    isSubscriptionCourse: Attribute.Boolean;
    quiz_progress: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::quiz-progress.quiz-progress'
    >;
    quiz_progresses: Attribute.Relation<
      'api::student-course.student-course',
      'oneToMany',
      'api::quiz-progress.quiz-progress'
    >;
    state: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    subscription: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::subscription.subscription'
    >;
    subscriptionEndDate: Attribute.Date;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::student-course.student-course',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    video_progress: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::video-progress.video-progress'
    >;
    video_progresses: Attribute.Relation<
      'api::student-course.student-course',
      'oneToMany',
      'api::video-progress.video-progress'
    >;
  };
}

export interface ApiSubscriptionPlanSubscriptionPlan
  extends Schema.CollectionType {
  collectionName: 'subscription_plans';
  info: {
    description: '';
    displayName: 'Subscription_Plan';
    pluralName: 'subscription-plans';
    singularName: 'subscription-plan';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    course_id: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToOne',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    duration_in_months: Attribute.Integer;
    name: Attribute.String;
    price: Attribute.Decimal;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriptionSubscription extends Schema.CollectionType {
  collectionName: 'subscriptions';
  info: {
    description: '';
    displayName: 'Subscription';
    pluralName: 'subscriptions';
    singularName: 'subscription';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    end_at: Attribute.DateTime;
    start_at: Attribute.DateTime;
    status: Attribute.Enumeration<['active', 'expired', 'canceled']>;
    student_course_id: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'api::student-course.student-course'
    >;
    subscription_plan_id: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'api::subscription-plan.subscription-plan'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user_id: Attribute.Relation<
      'api::subscription.subscription',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiVideoProgressVideoProgress extends Schema.CollectionType {
  collectionName: 'video_progresses';
  info: {
    description: '';
    displayName: 'Video_Progress';
    pluralName: 'video-progresses';
    singularName: 'video-progress';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    lasttime: Attribute.Integer;
    lesson: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'api::lesson.lesson'
    >;
    state: Attribute.Boolean & Attribute.DefaultTo<false>;
    student_course: Attribute.Relation<
      'api::video-progress.video-progress',
      'manyToOne',
      'api::student-course.student-course'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videotime: Attribute.Integer;
  };
}

export interface PluginCommentsComment extends Schema.CollectionType {
  collectionName: 'comments_comment';
  info: {
    description: 'Comment content type';
    displayName: 'Comment';
    kind: 'collectionType';
    pluralName: 'comments';
    singularName: 'comment';
    tableName: 'plugin-comments-comments';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    approvalStatus: Attribute.String;
    authorAvatar: Attribute.String;
    authorEmail: Attribute.Email;
    authorId: Attribute.String;
    authorName: Attribute.String;
    authorUser: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockReason: Attribute.String;
    content: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    isAdminComment: Attribute.Boolean;
    related: Attribute.String;
    removed: Attribute.Boolean;
    reports: Attribute.Relation<
      'plugin::comments.comment',
      'oneToMany',
      'plugin::comments.comment-report'
    >;
    threadOf: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::comments.comment'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsCommentReport extends Schema.CollectionType {
  collectionName: 'comments_comment-report';
  info: {
    description: 'Reports content type';
    displayName: 'Reports';
    kind: 'collectionType';
    pluralName: 'comment-reports';
    singularName: 'comment-report';
    tableName: 'plugin-comments-reports';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    content: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    reason: Attribute.Enumeration<['BAD_LANGUAGE', 'DISCRIMINATION', 'OTHER']> &
      Attribute.Required &
      Attribute.DefaultTo<'OTHER'>;
    related: Attribute.Relation<
      'plugin::comments.comment-report',
      'manyToOne',
      'plugin::comments.comment'
    >;
    resolved: Attribute.Boolean & Attribute.DefaultTo<false>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginEmailDesignerEmailTemplate
  extends Schema.CollectionType {
  collectionName: 'email_templates';
  info: {
    displayName: 'Email-template';
    name: 'email-template';
    pluralName: 'email-templates';
    singularName: 'email-template';
  };
  options: {
    comment: '';
    draftAndPublish: false;
    increments: true;
    timestamps: true;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    bodyHtml: Attribute.Text;
    bodyText: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::email-designer.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    design: Attribute.JSON;
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    name: Attribute.String;
    subject: Attribute.String;
    tags: Attribute.JSON;
    templateReferenceId: Attribute.Integer & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::email-designer.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    cart: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::course.course'
    >;
    charge: Attribute.String;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    country: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::country.country'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.RichText;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    intructor_info: Attribute.Component<'instructor.instructor'>;
    lastnames: Attribute.String;
    names: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phone: Attribute.String;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    student_courses: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::student-course.student-course'
    >;
    student_info: Attribute.Component<'student.student'>;
    subscription: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::subscription.subscription'
    >;
    UID: Attribute.UID<'plugin::users-permissions.user', 'username'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::answer.answer': ApiAnswerAnswer;
      'api::app-config.app-config': ApiAppConfigAppConfig;
      'api::article.article': ApiArticleArticle;
      'api::category.category': ApiCategoryCategory;
      'api::certificate.certificate': ApiCertificateCertificate;
      'api::complaints-book.complaints-book': ApiComplaintsBookComplaintsBook;
      'api::country.country': ApiCountryCountry;
      'api::coupon.coupon': ApiCouponCoupon;
      'api::course.course': ApiCourseCourse;
      'api::currency.currency': ApiCurrencyCurrency;
      'api::form-contact.form-contact': ApiFormContactFormContact;
      'api::group-course.group-course': ApiGroupCourseGroupCourse;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::izipay.izipay': ApiIzipayIzipay;
      'api::lesson.lesson': ApiLessonLesson;
      'api::link-resource.link-resource': ApiLinkResourceLinkResource;
      'api::marketing.marketing': ApiMarketingMarketing;
      'api::paypal.paypal': ApiPaypalPaypal;
      'api::post.post': ApiPostPost;
      'api::question.question': ApiQuestionQuestion;
      'api::quiz-progress.quiz-progress': ApiQuizProgressQuizProgress;
      'api::quiz.quiz': ApiQuizQuiz;
      'api::rating.rating': ApiRatingRating;
      'api::sale.sale': ApiSaleSale;
      'api::seccion.seccion': ApiSeccionSeccion;
      'api::session.session': ApiSessionSession;
      'api::setting.setting': ApiSettingSetting;
      'api::student-course.student-course': ApiStudentCourseStudentCourse;
      'api::subscription-plan.subscription-plan': ApiSubscriptionPlanSubscriptionPlan;
      'api::subscription.subscription': ApiSubscriptionSubscription;
      'api::video-progress.video-progress': ApiVideoProgressVideoProgress;
      'plugin::comments.comment': PluginCommentsComment;
      'plugin::comments.comment-report': PluginCommentsCommentReport;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::email-designer.email-template': PluginEmailDesignerEmailTemplate;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}

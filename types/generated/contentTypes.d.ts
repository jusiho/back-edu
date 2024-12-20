import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
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
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
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
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
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
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
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
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
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
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
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
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
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
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
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
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginCommentsComment extends Schema.CollectionType {
  collectionName: 'comments_comment';
  info: {
    tableName: 'plugin-comments-comments';
    singularName: 'comment';
    pluralName: 'comments';
    displayName: 'Comment';
    description: 'Comment content type';
    kind: 'collectionType';
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
    content: Attribute.Text & Attribute.Required;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockedThread: Attribute.Boolean & Attribute.DefaultTo<false>;
    blockReason: Attribute.String;
    authorUser: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    authorId: Attribute.String;
    authorName: Attribute.String;
    authorEmail: Attribute.Email;
    authorAvatar: Attribute.String;
    isAdminComment: Attribute.Boolean;
    removed: Attribute.Boolean;
    approvalStatus: Attribute.String;
    related: Attribute.String;
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
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    tableName: 'plugin-comments-reports';
    singularName: 'comment-report';
    pluralName: 'comment-reports';
    displayName: 'Reports';
    description: 'Reports content type';
    kind: 'collectionType';
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
    reason: Attribute.Enumeration<['BAD_LANGUAGE', 'DISCRIMINATION', 'OTHER']> &
      Attribute.Required &
      Attribute.DefaultTo<'OTHER'>;
    resolved: Attribute.Boolean & Attribute.DefaultTo<false>;
    related: Attribute.Relation<
      'plugin::comments.comment-report',
      'manyToOne',
      'plugin::comments.comment'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::comments.comment-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::comments.comment-report',
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
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
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
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    names: Attribute.String;
    cart: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::course.course'
    >;
    student_courses: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::student-course.student-course'
    >;
    lastnames: Attribute.String;
    country: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::country.country'
    >;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Attribute.RichText;
    charge: Attribute.String;
    UID: Attribute.UID<'plugin::users-permissions.user', 'username'>;
    intructor_info: Attribute.Component<'instructor.instructor'>;
    student_info: Attribute.Component<'student.student'>;
    phone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
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
    singularName: 'email-template';
    pluralName: 'email-templates';
    displayName: 'Email-template';
    name: 'email-template';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
    increments: true;
    comment: '';
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
    templateReferenceId: Attribute.Integer & Attribute.Unique;
    design: Attribute.JSON;
    name: Attribute.String;
    subject: Attribute.String;
    bodyHtml: Attribute.Text;
    bodyText: Attribute.Text;
    enabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    tags: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::email-designer.email-template',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
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
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnswerAnswer extends Schema.CollectionType {
  collectionName: 'answers';
  info: {
    singularName: 'answer';
    pluralName: 'answers';
    displayName: 'Answer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    description: Attribute.RichText;
    question: Attribute.Relation<
      'api::answer.answer',
      'manyToOne',
      'api::question.question'
    >;
    isCorrect: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::answer.answer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'app-config';
    pluralName: 'app-configs';
    displayName: 'app_config';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    clean_localstorage: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::app-config.app-config',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    slug: Attribute.UID<'api::article.article', 'title'>;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    description: Attribute.Text;
    related_articles: Attribute.DynamicZone<['dynamic.related-articles']>;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID<'api::category.category', 'name'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'certificate';
    pluralName: 'certificates';
    displayName: 'Certificate';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
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
    student_course: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'api::student-course.student-course'
    >;
    certificate_pdf: Attribute.Media<'files'>;
    certificate_image: Attribute.Media<'images'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::certificate.certificate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiComplaintsBookComplaintsBook extends Schema.CollectionType {
  collectionName: 'complaints_books';
  info: {
    singularName: 'complaints-book';
    pluralName: 'complaints-books';
    displayName: 'Complaints_Book';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullName: Attribute.String;
    identityDocument: Attribute.String;
    email: Attribute.String;
    phone: Attribute.String;
    details: Attribute.Text;
    complaintType: Attribute.Enumeration<['claim', 'complaint']>;
    request: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::complaints-book.complaints-book',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'coupon';
    pluralName: 'coupons';
    displayName: 'Coupon';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    code: Attribute.UID;
    description: Attribute.String;
    date_exp: Attribute.Date;
    minimum_expense: Attribute.Decimal;
    maximum_expense: Attribute.Decimal;
    qty_max: Attribute.Integer;
    qty_max_user: Attribute.Integer;
    products: Attribute.Relation<
      'api::coupon.coupon',
      'oneToMany',
      'api::course.course'
    >;
    categories: Attribute.Relation<
      'api::coupon.coupon',
      'oneToMany',
      'api::category.category'
    >;
    type: Attribute.Enumeration<['percentage', 'cart', 'product']>;
    discount: Attribute.Decimal & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::coupon.coupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'course';
    pluralName: 'courses';
    displayName: 'Course';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    seccions: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::seccion.seccion'
    >;
    slug: Attribute.UID<'api::course.course', 'title'>;
    description: Attribute.RichText;
    image: Attribute.Media<'images'>;
    teacher: Attribute.String;
    categories: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::category.category'
    >;
    video: Attribute.Media<'videos', true>;
    price: Attribute.Decimal & Attribute.Required & Attribute.DefaultTo<0>;
    studentsqty: Attribute.String;
    duration: Attribute.Integer;
    level: Attribute.Enumeration<['BASIC', 'MIDDLE', 'PRO']>;
    instructor: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    isfree: Attribute.Boolean & Attribute.DefaultTo<false>;
    mode: Attribute.Enumeration<['VIVO', 'RECORD']> &
      Attribute.Required &
      Attribute.DefaultTo<'RECORD'>;
    datevivo: Attribute.DateTime;
    preview_video: Attribute.String;
    reduced_price: Attribute.Decimal;
    sessions: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::session.session'
    >;
    group: Attribute.Integer;
    brochure_file: Attribute.Media<'images' | 'files'>;
    brochure_link: Attribute.String;
    group_courses: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::group-course.group-course'
    >;
    group_course: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'api::group-course.group-course'
    >;
    code: Attribute.UID;
    type: Attribute.Enumeration<['course', 'protocol']>;
    rating: Attribute.Decimal;
    ratings: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::rating.rating'
    >;
    finished: Attribute.Boolean & Attribute.DefaultTo<false>;
    more_instructors: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    is_final_project: Attribute.Boolean & Attribute.DefaultTo<false>;
    finish_date: Attribute.Date;
    auto_certificate: Attribute.Boolean & Attribute.DefaultTo<false>;
    subscription_plans: Attribute.Relation<
      'api::course.course',
      'manyToMany',
      'api::subscription-plan.subscription-plan'
    >;
    certificate_price: Attribute.Decimal;
    seo: Attribute.Component<'shared.seo'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCurrencyCurrency extends Schema.CollectionType {
  collectionName: 'currencies';
  info: {
    singularName: 'currency';
    pluralName: 'currencies';
    displayName: 'Currency';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::currency.currency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'form-contact';
    pluralName: 'form-contacts';
    displayName: 'Form_Contact';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    lastname: Attribute.String;
    email: Attribute.String;
    phone: Attribute.String;
    country: Attribute.String;
    education_from: Attribute.String;
    course: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::form-contact.form-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'group-course';
    pluralName: 'group-courses';
    displayName: 'Group_Course';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    date_course: Attribute.DateTime;
    name: Attribute.String;
    course: Attribute.Relation<
      'api::group-course.group-course',
      'manyToOne',
      'api::course.course'
    >;
    sessions: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::session.session'
    >;
    code: Attribute.UID;
    student_courses: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::student-course.student-course'
    >;
    finish_date: Attribute.Date;
    quizzes: Attribute.Relation<
      'api::group-course.group-course',
      'oneToMany',
      'api::quiz.quiz'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::group-course.group-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'Invoice';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    users_permissions_user: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    total: Attribute.Decimal;
    sales: Attribute.Relation<
      'api::invoice.invoice',
      'oneToMany',
      'api::sale.sale'
    >;
    state: Attribute.Enumeration<
      ['OUTSTANDING', 'ONHOLD', 'PAID', 'PROCESSING', 'FAILED']
    >;
    idpayment: Attribute.String;
    method: Attribute.Enumeration<['free', 'paid']>;
    currency: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'api::currency.currency'
    >;
    payment_method: Attribute.String;
    email_sent: Attribute.Boolean & Attribute.DefaultTo<false>;
    discount: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIzipayIzipay extends Schema.SingleType {
  collectionName: 'izipays';
  info: {
    singularName: 'izipay';
    pluralName: 'izipays';
    displayName: 'izipay';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    test: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::izipay.izipay',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'lesson';
    pluralName: 'lessons';
    displayName: 'Lesson';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    seccion: Attribute.Relation<
      'api::lesson.lesson',
      'manyToOne',
      'api::seccion.seccion'
    >;
    videourl: Attribute.String;
    order: Attribute.Integer & Attribute.Required;
    videotime: Attribute.Integer;
    timetext: Attribute.String;
    preview: Attribute.Boolean & Attribute.DefaultTo<false>;
    description: Attribute.RichText;
    mode: Attribute.Enumeration<['CONTENT', 'QUESTION']>;
    resourses: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    provider_id: Attribute.String;
    video_status: Attribute.Enumeration<
      ['pending', 'uploading', 'processing', 'ready']
    >;
    link_resources: Attribute.Relation<
      'api::lesson.lesson',
      'oneToMany',
      'api::link-resource.link-resource'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lesson.lesson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lesson.lesson',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLinkResourceLinkResource extends Schema.CollectionType {
  collectionName: 'link_resources';
  info: {
    singularName: 'link-resource';
    pluralName: 'link-resources';
    displayName: 'Link_Resource';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    link: Attribute.String;
    lesson: Attribute.Relation<
      'api::link-resource.link-resource',
      'manyToOne',
      'api::lesson.lesson'
    >;
    session: Attribute.Relation<
      'api::link-resource.link-resource',
      'manyToOne',
      'api::session.session'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::link-resource.link-resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::link-resource.link-resource',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaypalPaypal extends Schema.SingleType {
  collectionName: 'paypals';
  info: {
    singularName: 'paypal';
    pluralName: 'paypals';
    displayName: 'paypal';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    test: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::paypal.paypal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiQuestionQuestion extends Schema.CollectionType {
  collectionName: 'questions';
  info: {
    singularName: 'question';
    pluralName: 'questions';
    displayName: 'Question';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    description: Attribute.RichText;
    order: Attribute.Integer;
    answers: Attribute.Relation<
      'api::question.question',
      'oneToMany',
      'api::answer.answer'
    >;
    correct_answer: Attribute.Integer;
    mode: Attribute.Enumeration<['SINGLE', 'MULTIPLE']>;
    quiz: Attribute.Relation<
      'api::question.question',
      'manyToOne',
      'api::quiz.quiz'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::question.question',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuizQuiz extends Schema.CollectionType {
  collectionName: 'quizzes';
  info: {
    singularName: 'quiz';
    pluralName: 'quizzes';
    displayName: 'Quiz';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    seccion: Attribute.Relation<
      'api::quiz.quiz',
      'manyToOne',
      'api::seccion.seccion'
    >;
    order: Attribute.Integer;
    questions: Attribute.Relation<
      'api::quiz.quiz',
      'oneToMany',
      'api::question.question'
    >;
    description: Attribute.RichText;
    group_course: Attribute.Relation<
      'api::quiz.quiz',
      'manyToOne',
      'api::group-course.group-course'
    >;
    question_type: Attribute.Enumeration<['multiple', 'project']>;
    project_files: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    max_attempts: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::quiz.quiz', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::quiz.quiz', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiQuizProgressQuizProgress extends Schema.CollectionType {
  collectionName: 'quiz_progresses';
  info: {
    singularName: 'quiz-progress';
    pluralName: 'quiz-progresses';
    displayName: 'Quiz_Progress';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
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
    grade: Attribute.Decimal;
    project_files: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    attempts: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quiz-progress.quiz-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRatingRating extends Schema.CollectionType {
  collectionName: 'ratings';
  info: {
    singularName: 'rating';
    pluralName: 'ratings';
    displayName: 'Rating';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    rating: Attribute.Decimal;
    course: Attribute.Relation<
      'api::rating.rating',
      'manyToOne',
      'api::course.course'
    >;
    user: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::rating.rating',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSaleSale extends Schema.CollectionType {
  collectionName: 'sales';
  info: {
    singularName: 'sale';
    pluralName: 'sales';
    displayName: 'Sale';
    description: '';
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
    invoice: Attribute.Relation<
      'api::sale.sale',
      'manyToOne',
      'api::invoice.invoice'
    >;
    price: Attribute.Decimal;
    group_course: Attribute.Relation<
      'api::sale.sale',
      'oneToOne',
      'api::group-course.group-course'
    >;
    is_certificate: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::sale.sale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::sale.sale', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiSeccionSeccion extends Schema.CollectionType {
  collectionName: 'seccions';
  info: {
    singularName: 'seccion';
    pluralName: 'seccions';
    displayName: 'Seccion';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    course: Attribute.Relation<
      'api::seccion.seccion',
      'manyToOne',
      'api::course.course'
    >;
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
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::seccion.seccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'session';
    pluralName: 'sessions';
    displayName: 'Session';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    video_url: Attribute.String;
    course: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::course.course'
    >;
    title: Attribute.String;
    resourses: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    date: Attribute.DateTime;
    group_course: Attribute.Relation<
      'api::session.session',
      'manyToOne',
      'api::group-course.group-course'
    >;
    description: Attribute.Text;
    order: Attribute.Integer;
    provider_id: Attribute.String;
    video_status: Attribute.Enumeration<
      ['pending', 'uploading', 'processing', 'ready']
    > &
      Attribute.DefaultTo<'pending'>;
    link_resources: Attribute.Relation<
      'api::session.session',
      'oneToMany',
      'api::link-resource.link-resource'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::session.session',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSettingSetting extends Schema.SingleType {
  collectionName: 'settings';
  info: {
    singularName: 'setting';
    pluralName: 'settings';
    displayName: 'setting';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    clean_local: Attribute.Boolean;
    certificate_image: Attribute.Media<'images', true>;
    logo_main: Attribute.Media<'images', true>;
    time_offer_init: Attribute.DateTime;
    time_offer_finish: Attribute.DateTime;
    text_offer: Attribute.String;
    link_offer: Attribute.String;
    offer_active: Attribute.Boolean & Attribute.DefaultTo<false>;
    example_certificate: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
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
    singularName: 'student-course';
    pluralName: 'student-courses';
    displayName: 'Student_Course';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    video_progress: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::video-progress.video-progress'
    >;
    course: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::course.course'
    >;
    user: Attribute.Relation<
      'api::student-course.student-course',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    quiz_progress: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::quiz-progress.quiz-progress'
    >;
    state: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
    certificate: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'api::certificate.certificate'
    >;
    group_course: Attribute.Relation<
      'api::student-course.student-course',
      'manyToOne',
      'api::group-course.group-course'
    >;
    active: Attribute.Boolean & Attribute.DefaultTo<true>;
    video_progresses: Attribute.Relation<
      'api::student-course.student-course',
      'oneToMany',
      'api::video-progress.video-progress'
    >;
    quiz_progresses: Attribute.Relation<
      'api::student-course.student-course',
      'oneToMany',
      'api::quiz-progress.quiz-progress'
    >;
    create_user: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    final_project: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    final_grade: Attribute.Decimal;
    isSubscriptionCourse: Attribute.Boolean;
    subscriptionEndDate: Attribute.Date;
    subscription_plan: Attribute.Relation<
      'api::student-course.student-course',
      'manyToOne',
      'api::subscription-plan.subscription-plan'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::student-course.student-course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubscriptionPlanSubscriptionPlan
  extends Schema.CollectionType {
  collectionName: 'subscription_plans';
  info: {
    singularName: 'subscription-plan';
    pluralName: 'subscription-plans';
    displayName: 'Subscription_Plan';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    price: Attribute.Decimal;
    durationInMonths: Attribute.Integer;
    description: Attribute.Text;
    active: Attribute.Boolean;
    student_courses: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToMany',
      'api::student-course.student-course'
    >;
    courses: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'manyToMany',
      'api::course.course'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscription-plan.subscription-plan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVideoProgressVideoProgress extends Schema.CollectionType {
  collectionName: 'video_progresses';
  info: {
    singularName: 'video-progress';
    pluralName: 'video-progresses';
    displayName: 'Video_Progress';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    lesson: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'api::lesson.lesson'
    >;
    videotime: Attribute.Integer;
    lasttime: Attribute.Integer;
    state: Attribute.Boolean & Attribute.DefaultTo<false>;
    student_course: Attribute.Relation<
      'api::video-progress.video-progress',
      'manyToOne',
      'api::student-course.student-course'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::video-progress.video-progress',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::comments.comment': PluginCommentsComment;
      'plugin::comments.comment-report': PluginCommentsCommentReport;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::email-designer.email-template': PluginEmailDesignerEmailTemplate;
      'plugin::i18n.locale': PluginI18NLocale;
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
      'api::paypal.paypal': ApiPaypalPaypal;
      'api::post.post': ApiPostPost;
      'api::question.question': ApiQuestionQuestion;
      'api::quiz.quiz': ApiQuizQuiz;
      'api::quiz-progress.quiz-progress': ApiQuizProgressQuizProgress;
      'api::rating.rating': ApiRatingRating;
      'api::sale.sale': ApiSaleSale;
      'api::seccion.seccion': ApiSeccionSeccion;
      'api::session.session': ApiSessionSession;
      'api::setting.setting': ApiSettingSetting;
      'api::student-course.student-course': ApiStudentCourseStudentCourse;
      'api::subscription-plan.subscription-plan': ApiSubscriptionPlanSubscriptionPlan;
      'api::video-progress.video-progress': ApiVideoProgressVideoProgress;
    }
  }
}

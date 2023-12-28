export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),  
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('URL_NGINX', 'http://localhost:1337'),
  proxy:  env('IS_PROXIED', false),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

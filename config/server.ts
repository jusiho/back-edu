export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('URL_NGINX', 'https://sarpit.flyteek.com'),
  port: env.int('PORT', 1337),  
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

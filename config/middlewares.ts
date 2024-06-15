export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "editor.unlayer.com",
            "editor.unlayer.com/embed.js",
          ],
          "frame-src": ["'self'", "editor.unlayer.com"],
          "img-src": [
            "'self'",
            "data:",
            "cdn.jsdelivr.net",
            "strapi.io",
            "s3.amazonaws.com",
            "market-assets.strapi.io",
          ],
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

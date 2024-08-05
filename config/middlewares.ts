export default [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "connect-src": ["'self'", "https:"],
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
            "blob:",
            process.env.BUNNY_PULL_ZONE,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            process.env.BUNNY_PULL_ZONE,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: ["ingetechx.com","flyteek.com","flyteek.com"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

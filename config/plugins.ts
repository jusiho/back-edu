export default ({ env }) => ({
  //
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 15,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        name: env("SMTP_NAME"),
        host: env("SMTP_HOST", "mail.flyteek.com"),
        port: env("SMTP_PORT", 587),
        secure: env.bool("SMTP_SECURE", false),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env("SMTP_USERNAME"),
        defaultReplyTo: env("SMTP_USERNAME"),
      },
    },
  },
  "users-permissions": {
    enabled: true,
    config: {
      jwt: {
        expiresIn: "2m",
      },
    },
  },
});

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
        name: "sarpit.flyteek.com",
        host:"mail.flyteek.com",
        port: 465,
        secure: true,
        auth: {
          user: "hola@flyteek.com",
          pass: "xvA^XB959?]Pl}B00",
        },
        rejectUnauthorized: true,
        requireTLS: true,
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: "hola@flyteek.com",
        defaultReplyTo: "nice@flyteek.com",
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

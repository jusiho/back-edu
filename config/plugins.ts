export default ({ env })=>({
    //
    graphql: {
      config: {
        endpoint: '/graphql',
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
        provider: 'nodemailer',
        providerOptions: {
          name: "erudev.com",
          host: env('SMTP_HOST', 'mail.erudev.com'),
          port: env('SMTP_PORT', 465),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          // ... any custom nodemailer options
        },
        settings: {
          defaultFrom: 'team@erudev.com',
          defaultReplyTo: 'team@erudev.com',
        },
      },
    },
  });
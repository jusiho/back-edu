export default ({ env }) => ({
  //
  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::course.course"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
        "api::course.course": ["content"],
      },
      //   blockedAuthorProps: ["name", "email"],
      reportReasons: {
        DISCRIMINATION: "DISCRIMINATION",
      },
      gql: {
        auth: true,
      },
    },
  },
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
        port: env.int("SMTP_PORT", 587),
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
        expiresIn: "30d",
      },
    },
  },
  "email-designer": {
    enabled: true,

    // ⬇︎ Add the config property
    config: {
      editor: {
        // optional - if you have a premium unlayer account
        // projectId: [UNLAYER_PROJECT_ID],

        tools: {
          heading: {
            properties: {
              text: {
                value: "This is the new default text!",
              },
            },
          },
        },
        options: {
          features: {
            colorPicker: {
              presets: ["#D9E3F0", "#F47373", "#697689", "#37D67A"],
            },
          },
          fonts: {
            showDefaultFonts: false,
            /*
             * If you want use a custom font you need a premium unlayer account and pass a projectId number :-(
             */
            customFonts: [
              {
                label: "Anton",
                value: "'Anton', sans-serif",
                url: "https://fonts.googleapis.com/css?family=Anton",
              },
              {
                label: "Lato",
                value: "'Lato', Tahoma, Verdana, sans-serif",
                url: "https://fonts.googleapis.com/css?family=Lato",
              },
              // ...
            ],
          },
          mergeTags: [
            {
              name: "Email",
              value: "{{ USER.username }}",
              sample: "john@doe.com",
            },
            // ...
          ],
        },
        appearance: {
          theme: "dark",
          panels: {
            tools: {
              dock: "left",
            },
          },
        },
      },
    },
  },
  // upload: {
  //   config: {
  //     provider: "@nexide/strapi-provider-bunny",
  //     providerOptions: {
  //       // api_key: env("BUNNY_API_KEY"),
  //       // storage_zone: env("BUNNY_STORAGE_ZONE"),
  //       // pull_zone: env("BUNNY_PULL_ZONE"),
  //       api_key: env('BUNNY_API_KEY'),
  //       storage_zone: env('BUNNY_STORAGE_ZONE'),
  //       pull_zone: env('BUNNY_PULL_ZONE'),
  //       hostname: env('BUNNY_HOSTNAME'),
  //     },
  //   },
  // },
  upload: {
    config: {
      provider: "strapi-provider-upload-bunnynet",
      providerOptions: {
        api_key: env("BUNNY_API_KEY"),
        storage_zone: env("BUNNY_STORAGE_ZONE"),
        pull_zone: env("BUNNY_PULL_ZONE"),
        storage_endpoint: env("BUNNY_HOSTNAME")
      },
    },
  },
  seo: {
    enabled: true,
  },
});

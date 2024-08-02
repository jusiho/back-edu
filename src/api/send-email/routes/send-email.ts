export default {
  routes: [
    {
     method: 'POST',
     path: '/send-email',
     handler: 'send-email.sendEmail',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'POST',
      path: '/send-general-email',
      handler: 'send-email.sendGeneralEmail',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};

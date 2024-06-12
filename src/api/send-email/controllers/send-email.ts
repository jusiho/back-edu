/**
 * A set of functions called "actions" for `send-email`
 */

export default {
  sendEmail: async (ctx, next) => {
    try {
      const { invoiceId } = ctx.request.body;
      const dataInvoice = await strapi.entityService.findOne(
        "api::invoice.invoice",
        invoiceId,
        {
          populate: {
            users_permissions_user: true,
            sales: {
              populate: { course: true },
            },
          },
        }
      );

      const totalPrice = dataInvoice.sales.reduce(
        (acc, sale) => acc + sale.price,
        0
      );

      const updatedInvoice = { ...dataInvoice, totalPrice };

      console.log("dataInvoice", updatedInvoice);

      await strapi.plugin("email-designer").service("email").sendTemplatedEmail(
        {
          // required
          to: dataInvoice.users_permissions_user.email,

          // optional if /config/plugins.js -> email.settings.defaultFrom is set
          from: process.env.SMTP_USERNAME,

          // optional if /config/plugins.js -> email.settings.defaultReplyTo is set
          replyTo: "no-reply@flyteek.com",

          // optional array of files
          // attachments: [],
        },
        {
          // required - Ref ID defined in the template designer (won't change on import)
          templateReferenceId: 1,

          // If provided here will override the template's subject.
          // Can include variables like `Thank you for your order {{= USER.firstName }}!`
          subject: `Comprobante de cursos`,
        },
        updatedInvoice
      );

      // Use the data variable to access the data from the POST request
      ctx.body = "ok";
    } catch (err) {
      console.log("Error", err);

      ctx.body = err;
    }
  },
};

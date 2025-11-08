export default {
    /**
     * Simple example.
     * Every monday at 1am.
     * Every day at 3am.
     */

    "*/30 * * * * *": async ({ strapi }) => {
        // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
        await strapi
            .service("api::subscription.subscription")
            .expireSubscriptions();
            
    },
};
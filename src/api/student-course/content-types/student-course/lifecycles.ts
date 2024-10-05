export default {
  async afterCreate(event) {
    const { result, params } = event;
    const { data } = params;

    const { subscription_plan } = data;
    console.log("subscription_plan : ", subscription_plan);

    // const plan = await strapi.services["subscription-plan"].findOne({
    //   id: subscription_plan.id,
    // });
  },
  async afterUpdate(event) {
    const { result, params } = event;
    const { data, populate } = params;

    const { subscription_plan, isSubscriptionCourse } = data;

    if (isSubscriptionCourse && subscription_plan.connect.length > 0) {
      const entrySubscription = await strapi.entityService.findOne(
        "api::subscription-plan.subscription-plan",
        subscription_plan.connect[0].id,
        {
          fields: ["name", "description"],
          populate: { student_courses: true },
        }
      );

      console.log("entrySubscription : ", entrySubscription);
    }
  },
};

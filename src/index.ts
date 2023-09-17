export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendInputType({
          type: "UsersPermissionsRegisterInput",
          definition(t) {
            // here define fields you need
            t.string("names");
            t.string("lastnames");
            t.field("role", {
              type: "String",
              resolve: async (root, args) => {
                const userData = await strapi.db
                  .query("plugin::users-permissions.user")
                  .findOne({
                    select: [],
                    where: { id: root.id },
                    // populate: { role: true },
                  });
                return userData.role.type;
              },
            });
          },
        }),
      ],
    }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};

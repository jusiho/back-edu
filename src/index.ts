export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {
    const { transformArgs, getContentTypeArgs } = strapi
      .plugin("graphql")
      .service("builders").utils;
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
            t.field("student_courses", {
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

    // extensionService.use(({ nexus }) => ({
    //   types: [
    //     nexus.extendType({
    //       type: "Query",
    //       definition: (t) => {
    //         t.field("studentNotCourse", {
    //           type: "String",
    //           args: { id: nexus.stringArg() },
    //           resolve: async (root, args, ctx) => {
    //             const transformedArgs = transformArgs(args, {
    //               contentType: strapi.contentTypes["api::course.course"],
    //               usePagination: false,
    //             });
    //             const data = await strapi.services["api::course.course"].find({
    //               filters: { id: args.id },
    //             });
    //             const usuarios = await strapi.db
    //               .query("plugin::users-permissions.user")

    //               .findOne({
    //                 where: { email: "carloblas123@gmail.com" },
    //                 populate: {
    //                   student_courses: true,
    //                 },
    //               });

    //             console.log("user : ", usuarios);
    //             console.log("Transform : ", transformedArgs);
    //             console.log("data : ", data);

    //             const { find } = strapi
    //               .plugin("graphql")
    //               .service("builders")
    //               .get("content-api")
    //               .buildQueriesResolvers({
    //                 contentType: strapi.contentTypes["api::course.course"],
    //               });
    //             console.log("find : ", find);

    //             return "XD";
    //           },
    //         });
    //       },
    //     }),
    //   ],
    //   resolversConfig: {
    //     "Query.findBySlug": {
    //       auth: false,
    //     },
    //   },
    // }));
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

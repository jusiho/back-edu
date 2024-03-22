export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
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

    // ----------------------------------------------------------------------------------------
    // extensionService.use(({ nexus }) => ({
    //   types: [
    //     nexus.extendType({
    //       type: "Query",
    //       definition: (t) => {
    //         t.field("studentNotCourse", {
    //           type: "PopularityResponse",
    //           args: { id: nexus.stringArg() },
    //           resolve: async (root, args, ctx) => {
    //             // const entries = await strapi.entityService.findMany(
    //             //   "api::studentCourse.studentCourse",
    //             //   {
    //             //     filters: {
    //             //       title: "Hello World",
    //             //       createdAt: { $gt: "2021-11-17T14:28:25.843Z" },
    //             //     },
    //             //   }
    //             // );

    //             // Obtener id de todos los registros de studentCourse
    //             // const data2 = await strapi.services["api::studentCourse.studentCourse"].find({
    //             //   filters: { id: 25 },
    //             // });
    //             // console.log("data2", data2);

    //             const studenCourses = await strapi.entityService.findMany(
    //               "api::student-course.student-course",
    //               {
    //                 populate: ["user", "course"],
    //                 filters: { course: { id: { $eq: 25 } } },
    //               }
    //             );
    //             console.log("studenCourses", studenCourses);

    //             // obtener id de los usurrios y guardarlos en un arreglo de todos los registros de studenCourses usando map
    //             const users = studenCourses.map((user) => user.user.id);
    //             console.log(users);

    //             console.log("studenCourses", studenCourses);

    //             const usuarios = await strapi.db
    //               .query("plugin::users-permissions.user")

    //               .findPage({
    //                 where: {
    //                   id: { $in: users },
    //                 },
    //                 page: 1,
    //                 pageSize: 15,
    //               });

    //             console.log("usuarios", usuarios);

    //             return usuarios;
    //           },
    //         });
    //       },
    //     }),
    //     nexus.objectType({
    //       name: "PopularityResponse", // this is our custom object type
    //       definition(t) {
    //         t.field("users", {
    //           // and if requested, a field to query the product content type
    //           type: "UsersPermissionsUserEntityResponseCollection",
    //         });
    //       },
    //     }),
    //   ],
    //   resolversConfig: {
    //     "Query.studentNotCourse": {
    //       auth: false,
    //     },
    //   },
    // }));

    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "Query",
          definition: (t) => {
            t.field("studentNotCourse", {
              type: "PopularityResponse",
              args: {
                id: nexus.stringArg(),
                page: nexus.intArg(),
                pageSize: nexus.intArg(),
                search: nexus.stringArg(),
              },
              resolve: async (root, args, ctx) => ({
                course: args,
              }),
            });
          },
        }),
        nexus.objectType({
          name: "PopularityResponse", // this is our custom object type
          definition(t) {
            t.field("users", {
              // and if requested, a field to query the product content type
              // type: "CourseEntityResponseCollection",
              type: "UsersPermissionsUserEntityResponseCollection",
              resolve: async (parent, args) => {
                const { toEntityResponseCollection } = strapi.service(
                  "plugin::graphql.format"
                ).returnTypes;

                const start =
                  (parent.course.page - 1) * parent.course.pageSize || 0;
                const limit = parent.course.pageSize || 100;
                console.log("start : ", start);
                console.log("limit : ", limit);

                const studenCourses = await strapi.entityService.findMany(
                  "api::student-course.student-course",
                  {
                    populate: ["user", "course"],
                    filters: { course: { id: { $eq: parent.course.id } } },
                  }
                );

                if (studenCourses.length === 0) {
                  const usuarios = await strapi.entityService.findMany(
                    "plugin::users-permissions.user",
                    {
                      filters: {
                        $or: [
                          { names: { $contains: parent.course.search } },
                          { lastnames: { $contains: parent.course.search } },
                        ],
                      },
                      start: start,
                      limit: limit,
                    }
                  );

                  return toEntityResponseCollection(usuarios, {
                    args: {
                      filters: {
                        $or: [
                          { names: { $contains: parent.course.search } },
                          { lastnames: { $contains: parent.course.search } },
                        ],
                      },
                      start,
                      limit,
                    },
                    resourceUID: "plugin::users-permissions.user",
                  });
                }

                // Filtrar elementos que tienen el objeto user y obtener sus user.id
                const userIdsSet = new Set(
                  studenCourses
                    .filter(
                      (item) => item.user !== null && item.user !== undefined
                    )
                    .map((item) => item.user.id)
                );
                // Convertir el conjunto a un arreglo
                const userIds = Array.from(userIdsSet);

                // const { results, pagination } = await strapi.db
                //   .query("plugin::users-permissions.user")
                //   .findPage({
                //     where: {
                //       id: { $notIn: userIds },
                //     },
                //     page: parent.course.page,
                //     pageSize: parent.course.pageSize,
                //   });

                const usuarios = await strapi.entityService.findMany(
                  "plugin::users-permissions.user",
                  {
                    filters: {
                      id: { $notIn: userIds },
                      $or: [
                        { names: { $contains: parent.course.search } },
                        { lastnames: { $contains: parent.course.search } },
                      ],
                    },
                    start: start,
                    limit: limit,
                  }
                );

                console.log("usuarios", usuarios);

                // where we provide the resolver as Strapi does not know about relations of our new PopularityResponse type
                return toEntityResponseCollection(usuarios, {
                  args: {
                    filters: {
                      id: { $notIn: userIds },
                      $or: [
                        { names: { $contains: parent.course.search } },
                        { lastnames: { $contains: parent.course.search } },
                      ],
                    },
                    start,
                    limit,
                  },
                  resourceUID: "plugin::users-permissions.user",
                });
              },
            });
          },
        }),
      ],
      resolversConfig: {
        "Query.studentNotCourse": {
          auth: false,
        },
      },
    }));

    strapi.controllers[
      "plugin::users-permissions.settings"
    ].updateEmailTemplate =
      require("./extensions/users-permissions/overrides").updateEmailTemplate;
    //   extensionService.use(({ nexus }) => ({
    //     // GraphQL SDL
    //     typeDefs: `
    //     type City{
    //       city: String
    //    }

    //      type Cosas {
    //          value: City
    //      }

    //       type Query {
    //         studentNotCourse: Cosas
    //       }
    //  `,
    //     resolvers: {
    //       Query: {
    //         studentNotCourse: {
    //           resolve() {
    //             return { value: { city: "Montpellier" } };
    //           },
    //         },
    //       },
    //     },
    //     // resolversConfig: {
    //     //   "Query.findBySlug": {
    //     //     auth: false,
    //     //   },
    //     // },
    //   }));
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {},
};

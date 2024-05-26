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
            t.boolean("confirmed");
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
                id: nexus.arg({
                  type: "ID",
                  as: ["String", "Int"],
                }),
                page: nexus.intArg(),
                pageSize: nexus.intArg(),
                search: nexus.stringArg(),
                isOwn: nexus.booleanArg(),
              },
              resolve: async (root, args, ctx) => ({
                // Recibe argumentos y almacena en data
                data: args,
              }),
            });

            // Grupos curso donde no se encuentra usuario
            t.field("groupsStudent", {
              type: "GroupResponseType",
              args: {
                id: nexus.arg({
                  type: "ID",
                  as: ["String", "Int"],
                }),
                page: nexus.intArg(),
                pageSize: nexus.intArg(),
                search: nexus.stringArg(),
                isOwn: nexus.booleanArg(),
              },
              resolve: async (root, args, ctx) => ({
                // Recibe argumentos y almacena en data
                data: args,
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
                  (parent.data.page - 1) * parent.data.pageSize || 0;
                const limit = parent.data.pageSize || 100;
                console.log("start : ", start);
                console.log("limit : ", limit);

                const studentCourses = await strapi.entityService.findMany(
                  "api::student-course.student-course",
                  {
                    populate: ["user", "group_course"],
                    filters: { group_course: { id: { $eq: parent.data.id } } },
                  }
                );

                const filterUsers = async (additionalFilters) => {
                  const usuarios = await strapi.entityService.findMany(
                    "plugin::users-permissions.user",
                    {
                      filters: {
                        ...additionalFilters,
                        $or: [
                          { names: { $containsi: parent.data.search } },
                          { lastnames: { $containsi: parent.data.search } },
                        ],
                      },
                      start: start,
                      limit: limit,
                    }
                  );

                  return toEntityResponseCollection(usuarios, {
                    args: {
                      filters: {
                        ...additionalFilters,
                        $or: [
                          { names: { $containsi: parent.data.search } },
                          { lastnames: { $containsi: parent.data.search } },
                        ],
                      },
                      start,
                      limit,
                    },
                    resourceUID: "plugin::users-permissions.user",
                  });
                };

                if (studentCourses.length === 0) {
                  return await filterUsers({});
                }

                const userIdsSet = new Set(
                  studentCourses
                    .filter(
                      (item) => item.user !== null && item.user !== undefined
                    )
                    .map((item) => item.user.id)
                );

                const userIds = Array.from(userIdsSet);
                return await filterUsers({ id: { $notIn: userIds } });
              },
            });
          },
        }),
        nexus.objectType({
          name: "GroupResponseType", // nombre del nuevo tipo
          definition(t) {
            t.field("groups", {
              type: "GroupCourseEntityResponseCollection",
              resolve: async (parent, args) => {
                // tu lógica de resolución aquí...
                const { toEntityResponseCollection } = strapi.service(
                  "plugin::graphql.format"
                ).returnTypes;

                const start =
                  (parent.data.page - 1) * parent.data.pageSize || 0;
                const limit = parent.data.pageSize || 100;
                console.log("start : ", start);
                console.log("parent.data.id : ", parent.data.id);

                const studentCourses = await strapi.entityService.findMany(
                  "api::student-course.student-course",
                  {
                    populate: ["user", "group_course"],
                    filters: {
                      user: { id: { $eq: parent.data.id } },
                      active: { $eq: true },
                    },
                  }
                );
                console.log("studentCourses : ", studentCourses);
                
                
                const groupCourseIdsSet = new Set(
                  studentCourses
                    .filter(
                      (item) => item.group_course !== null && item.group_course !== undefined
                    )
                    .map((item) => item.group_course.id)
                );
                
                const groupCourseIds = Array.from(groupCourseIdsSet);
                console.log("groupCourseIdsSet : ", groupCourseIds);

                const filterGroups = async (additionalFilters) => {
                  const groupsCourse = await strapi.entityService.findMany(
                    "api::group-course.group-course",
                    {
                      filters: {
                        ...additionalFilters,
                        course: { title: { $containsi: parent.data.search } },
                      },
                      start: start,
                      limit: limit,
                    }
                  );

                  return toEntityResponseCollection(groupsCourse, {
                    args: {
                      filters: {
                        ...additionalFilters,
                        course: { title: { $containsi: parent.data.search } },
                      },
                      start,
                      limit,
                    },
                    resourceUID: "api::group-course.group-course",
                  });
                };

                if (parent.data.isOwn) {
                  return await filterGroups({ id: { $in: groupCourseIds } });
                }

                if (studentCourses.length === 0) {
                  return await filterGroups({});
                }

                return await filterGroups({ id: { $notIn: groupCourseIds } });
              },
            });
          },
        }),
      ],
      resolversConfig: {
        "Query.studentNotCourse": {
          auth: false,
        },
        "Query.groupsStudent": {
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

import { subcriptionResolvers } from "./extensions/student-courses/subcription";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
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
                  const filters = {
                    ...additionalFilters,
                  };

                  if (parent.data.search) {
                    filters.$or = [
                      { names: { $containsi: parent.data.search } },
                      { lastnames: { $containsi: parent.data.search } },
                      { email: { $containsi: parent.data.search } },
                    ];
                  }

                  const usuarios = await strapi.entityService.findMany(
                    "plugin::users-permissions.user",
                    {
                      filters: filters,
                      start: start,
                      limit: limit,
                    }
                  );

                  return toEntityResponseCollection(usuarios, {
                    args: {
                      filters: filters,
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
                console.log(
                  "args ------------------------------------->",
                  args
                );

                // tu lógica de resolución aquí...
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
                    filters: {
                      user: { id: { $eq: parent.data.id } },
                      active: { $eq: true },
                    },
                  }
                );

                const studentCoursesDesactive =
                  await strapi.entityService.findMany(
                    "api::student-course.student-course",
                    {
                      populate: ["user", "group_course"],
                      filters: {
                        user: { id: { $eq: parent.data.id } },
                        $or: [
                          { active: { $eq: null } },
                          { active: { $eq: false } },
                        ],
                      },
                    }
                  );
                console.log("studentCoursesDesactive", studentCoursesDesactive);

                const groupCourseIdsSet = new Set(
                  studentCourses
                    .filter(
                      (item) =>
                        item.group_course !== null &&
                        item.group_course !== undefined
                    )
                    .map((item) => item.group_course.id)
                );

                const groupCourseIds =
                  groupCourseIdsSet.size > 0
                    ? Array.from(groupCourseIdsSet)
                    : null;
                const groupCourseIdsDesactive = Array.from(
                  studentCoursesDesactive
                );

                const filterGroups = async (additionalFilters) => {
                  console.log("additionalFilters", additionalFilters);

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

                  console.log("groupsCourse -----------> ", groupsCourse);
                  console.log("groupCourseIds -----------> ", groupCourseIds);

                  // Se agrega la propiedad isUserMember a cada grupo
                  const groupsWithMembership = groupsCourse.map((group) => ({
                    ...group,
                    isUserMember: groupCourseIds
                      ? groupCourseIds.includes(group.id)
                      : false,
                    isActive: groupCourseIdsDesactive.includes(group.id),
                  }));

                  console.log(
                    "groupsWithMembership --------> ",
                    groupsWithMembership
                  );

                  return toEntityResponseCollection(groupsWithMembership, {
                    args: {
                      filters: {
                        ...additionalFilters,
                        course: { title: { $containsi: parent.data.search } },
                      },
                      start: start,
                      limit: limit,
                    },
                    resourceUID: "api::group-course.group-course",
                  });
                };

                if (parent.data.isOwn) {
                  return await filterGroups({ id: { $in: groupCourseIds } });
                }

                return await filterGroups({});
              },
            });
          },
        }),
        nexus.extendType({
          type: "GroupCourse",
          definition(t) {
            t.boolean("isUserMember", {
              resolve: async (parent, args, ctx) => {
                // lógica para determinar si el usuario es miembro o no

                return parent.isUserMember;
              },
            });
            t.boolean("isActive", {
              resolve: async (parent, args, ctx) => {
                // lógica para determinar si el usuario es miembro o no
                return parent.isActive;
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

    // Allow to extend schema comments, for view author full data
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "CommentSingle",
          definition(t) {
            t.string("authorFull", {
              type: "UsersPermissionsUserEntityResponse",
              description: "Author full data",
              resolve: async (parent, root, args) => {
                const { toEntityResponse } = strapi.service(
                  "plugin::graphql.format"
                ).returnTypes;
                console.log("parent", parent.author.id);
                const user = await strapi.db
                  .query("plugin::users-permissions.user")
                  .findOne({
                    where: { id: parent.author.id },
                    populate: { profile_image: true },
                  });
                console.log("user", user);

                return toEntityResponse(user);
              },
            });
          },
        }),
      ],
    }));

    // Usar la lógica desde el archivo externo
    extensionService.use(({ strapi }) => subcriptionResolvers);

    strapi.controllers[
      "plugin::users-permissions.settings"
    ].updateEmailTemplate =
      require("./extensions/users-permissions/overrides").updateEmailTemplate;
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

import { Strapi } from '@strapi/strapi';

// Define los tipos de las resoluciones
export const subcriptionResolvers = {
  typeDefs: `
    type Query {
      authorsContacts: [AuthorContact]
    }

    type AuthorContact {
      id: ID
      name: String
      email: String
      articles: [Article]
    }
  `,

  resolvers: {
    Query: {
      authorsContacts: {
        resolve: async (parent: any, args: any, context: any, strapi: Strapi) => {
          const data = await strapi.services["api::writer.writer"].find({
            populate: ["articles"],
          });

          return data.results.map((author: any) => ({
            id: author.id,
            name: author.name,
            email: author.email,
            articles: author.articles,
          }));
        },
      },
    },
  },

  resolversConfig: {
    "Query.authorsContacts": {
      auth: false,
    },
  },
};

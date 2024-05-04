const getService = (name: string): any => {
  return strapi.plugin("users-permissions").service(name);
};

export { getService };

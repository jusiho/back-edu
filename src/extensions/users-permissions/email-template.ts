import { trim } from "lodash/fp";
const {
  template: { createLooseInterpolationRegExp, createStrictInterpolationRegExp },
} = require("@strapi/utils");

interface UserSchema {
  attributes: Record<string, unknown>;
}

// Simulando la obtención del modelo desde strapi. Ajusta según sea necesario.
declare const strapi: {
  getModel: (model: string) => UserSchema;
};

const invalidPatternsRegexes: RegExp[] = [
  /<%[^=]([\s\S]*?)%>/m,
  /\${([^{}]*)}/m,
];

const userSchema: UserSchema = strapi.getModel(
  "plugin::users-permissions.user"
);

const authorizedKeys: string[] = [
  "URL",
  "ADMIN_URL",
  "SERVER_URL",
  "CODE",
  "USER",
  ...Object.entries(userSchema.attributes).map(([key]) => `USER.${key}`),
  "TOKEN",
];

const matchAll = (pattern: RegExp, src: string): string[] => {
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  const regexPatternWithGlobal: RegExp = new RegExp(pattern, "g");

  while ((match = regexPatternWithGlobal.exec(src))) {
    const [, group] = match;
    matches.push(trim(group));
  }

  return matches;
};

const isValidEmailTemplate = (template: string): boolean => {
  for (const reg of invalidPatternsRegexes) {
    if (reg.test(template)) {
      return false;
    }
  }

  const interpolation = {
    strict: createStrictInterpolationRegExp(authorizedKeys),
    loose: createLooseInterpolationRegExp(),
  };

  const strictMatches = matchAll(interpolation.strict, template);
  const looseMatches = matchAll(interpolation.loose, template);

  if (looseMatches.length > strictMatches.length) {
    return false;
  }

  return true;
};

export { isValidEmailTemplate };

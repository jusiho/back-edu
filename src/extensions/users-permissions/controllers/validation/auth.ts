import { yup, validateYupSchema } from "@strapi/utils";

const callbackBodySchema = yup.object().shape({
  identifier: yup.string().required(),
  password: yup.string().required(),
});

export const validateCallbackBody = validateYupSchema(callbackBodySchema);

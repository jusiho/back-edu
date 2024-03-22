import { Context } from "koa"; // Asumiendo el uso de Koa para el contexto
import _ from "lodash";
import * as utils from "@strapi/utils";
const { ApplicationError, ValidationError } = utils.errors; // Asumiendo que necesitas importar ValidationError de algún lugar
import { isValidEmailTemplate } from "./email-template";

interface EmailTemplate {
  options: {
    message: string;
  };
}

interface EmailTemplates {
  [key: string]: EmailTemplate;
}

// Asume que 'strapi' tiene un tipo definido en algún lugar. Si no, tendrías que definirlo o usar any como tipo (no recomendado)
declare const strapi: any;

export const updateEmailTemplate = async (ctx: Context): Promise<void> => {
  if (_.isEmpty(ctx.request.body)) {
    throw new ValidationError("Request body cannot be empty");
  }
  const requestBody = ctx.request.body;
  const emailTemplates: EmailTemplates = requestBody["email-templates"];

  for (const key of Object.keys(emailTemplates)) {
    const template: string = emailTemplates[key].options.message;

    if (!isValidEmailTemplate(template)) {
      throw new ValidationError("Invalid template");
    }
  }

  await strapi
    .store({ type: "plugin", name: "users-permissions", key: "email" })
    .set({ value: emailTemplates });

  ctx.send({ ok: true });
};

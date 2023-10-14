# path: ./Dockerfile

FROM node:18
# Installing libvips-dev for sharp Compatibility
RUN apt-get update && apt-get install libvips-dev -y
# RUN apk update && apk add  build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm install
RUN npm install --ignore-scripts=false --foreground-scripts --verbose sharp
RUN npm install --platform=linux --arch=x64 sharp
RUN npm i @strapi/plugin-graphql
RUN npm i @strapi/provider-email-nodemailer
# RUN npm install @_sh/strapi-plugin-ckeditor
# RUN npm i strapi-plugin-ckeditor5@latest
# RUN npm install strapi-plugin-react-editorjs
# RUN npm install --ignore-scripts=false --verbose
WORKDIR /opt/app
COPY ./ .
RUN npm run build
# RUN npm run strapi export -- --no-compress
EXPOSE 1337
CMD ["npm", "run", "develop"]

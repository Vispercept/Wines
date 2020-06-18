# dev stage
FROM node:12-alpine AS dev

WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]


# production stage
FROM node:12-alpine as production

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=dev /usr/src/app/ ./
COPY . .
RUN npm run lint
RUN npm run test
RUN npm prune --production
# RUN npm audit --production

EXPOSE 8080

CMD [ "node", "src" ]

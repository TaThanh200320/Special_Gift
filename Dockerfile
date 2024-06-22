# FROM oven/bun:canary-alpine as build
FROM node:18-alpine as base
WORKDIR /usr/src/app

FROM base as install
RUN mkdir /tmp/dev
COPY package.json yarn.lock /tmp/dev/
RUN cd /tmp/dev && yarn install --frozen-lockfile

RUN mkdir /tmp/prod
COPY package.json yarn.lock /tmp/prod/
RUN cd /tmp/prod && yarn install --frozen-lockfile --production

FROM base as prerelease
COPY --from=install /tmp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN yarn build

RUN apk update && apk upgrade --no-cache
RUN apk --no-cache add curl && \
    rm -rf /var/cache/apk/*

FROM base AS release
COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/.next ./.next
COPY --from=prerelease /usr/src/app/public ./public


HEALTHCHECK --interval=30s --timeout=1s \
    CMD curl -f http://localhost:3000 || exit 1

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
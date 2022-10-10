FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm pkg set scripts.prepare=""
RUN npm ci --omit=dev

COPY --chown=node:node . .
RUN npx nx run backend:build:production
RUN npm prune --production

# ---
FROM node:16-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 3333
LABEL org.opencontainers.image.source https://github.com/University-of-Auckland-SOFTENG761/project-team-1

CMD ["node", "dist/apps/backend/main.js"]

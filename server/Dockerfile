FROM node:24-alpine

WORKDIR /app
COPY server ./server

ENV NODE_ENV=production
ENV API_HOST=0.0.0.0
ENV API_PORT=8787
ENV DATABASE_PATH=/data/dashboard.sqlite

EXPOSE 8787
CMD ["node", "server/index.mjs"]

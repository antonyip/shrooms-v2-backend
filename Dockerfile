FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY [".", "/app"]
RUN npm install --omit=dev
CMD [ "node", "index.js" ]

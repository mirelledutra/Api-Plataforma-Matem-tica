FROM node:20-alpine

WORKDIR /api-plataforma-de-matematica

EXPOSE 3000

COPY . .

RUN npm install

ENTRYPOINT npm run dev

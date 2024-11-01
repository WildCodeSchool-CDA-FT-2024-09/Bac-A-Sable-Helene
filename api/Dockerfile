FROM node:lts-alpine AS dev

WORKDIR /app

COPY *.json ./

RUN npm i

COPY src src

COPY data data

EXPOSE 4000

CMD ["npm", "run", "full"]

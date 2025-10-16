# node v22.15.0
FROM node:20-alpine AS deps-prod

WORKDIR /app

COPY ./package*.json .
COPY ./.env .
RUN mkdir ./dist
RUN mkdir ./dist/config
COPY ./credentials.json /app/dist/config/
RUN npm install --omit=dev

#COPY dist/ /app/dist
#COPY .env /app

FROM deps-prod AS build

RUN npm install --include=dev

COPY . .

RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app

#RUN mkdir ./dist

COPY --from=build /app/package*.json .
COPY --from=build /app/.env .
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
#COPY --from=build /app/src ./src


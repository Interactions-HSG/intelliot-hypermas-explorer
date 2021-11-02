# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g handlebars
RUN npm install -g less
RUN npm install --production
COPY . .

EXPOSE 80

CMD ./launchClientDocker.sh



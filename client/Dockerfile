# syntax=docker/dockerfile:1

FROM node:12.18.1
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install -g handlebars
RUN npm install -g less
RUN npm install --production

COPY . .

RUN chmod +x ./launchClientDocker.sh

RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix ./launchClientDocker.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

EXPOSE 80

CMD ./launchClientDocker.sh



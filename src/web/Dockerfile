#https://jonathanantoine.medium.com/hosting-an-angular-application-inside-a-docker-container-with-nginx-b10f3f0a4c26
FROM node:lts-slim as build
WORKDIR /src
RUN npm install -g @angular/cli
COPY ./scu-webservice/ ./scu-webservice/
WORKDIR /src/scu-webservice
RUN npm ci
RUN ng build --configuration=production

FROM nginx:stable AS final
EXPOSE 80
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build src/scu-webservice/dist/scu-webservice/browser  /usr/share/nginx/html

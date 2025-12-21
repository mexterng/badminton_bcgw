# scu_web
## build whole webapp:
```shell
docker-compose up -d --build
```
## only test style changes in angular
```shell
cd src/web/scu-webservice
ng serve
```

## .env file
```
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
DB_PORT=3306
DB_HOST=192.28.1.16
DB_USER=
DB_PASSWORD=
ENVIRONMENT=development or production 
```

## links for later:
https://escape.tech/blog/how-to-secure-express-js-api/ => How to secure APIs built with Express.js
https://www.w3schools.com/nodejs/nodejs_api_auth.asp => authentication guide with node js
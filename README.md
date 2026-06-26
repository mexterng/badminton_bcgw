# bcgw_web
## build whole webapp:
```shell
docker-compose up -d --build
```
## only test style changes in angular
```shell
cd src/web/webservice
ng serve
```

## .env file
```
WEB_PORT=
API_PORT=
DB_PORT=
CLUB_PREFIX=
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
DB_HOST=
DB_USER=
DB_PASSWORD=
ENVIRONMENT=development or production 
```

## links for later:
https://escape.tech/blog/how-to-secure-express-js-api/ => How to secure APIs built with Express.js
https://www.w3schools.com/nodejs/nodejs_api_auth.asp => authentication guide with node js


## update files for individual style
src\web\webservice\src\index.html
src\web\webservice\src\styles.scss
src\web\webservice\src\index.html
src\web\webservice\src\app\subcomponents\header\header.component.html
src\web\webservice\public\CHANGELOG.md
src\web\webservice\public\favicon.ico
src\web\webservice\public\favicon.svg
src\web\webservice\public\icons
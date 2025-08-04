#https://docs.docker.com/guides/databases/
FROM mysql:latest as build
ENV MYSQL_DATABASE mydb
COPY ./scripts/ /docker-entrypoint-initdb.d/

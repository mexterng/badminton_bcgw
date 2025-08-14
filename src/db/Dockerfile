#https://docs.docker.com/guides/databases/
FROM mysql:latest as build
COPY ./scripts/ /docker-entrypoint-initdb.d/

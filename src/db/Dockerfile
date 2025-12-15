#https://docs.docker.com/guides/databases/
FROM mysql:latest as build
ARG ENVIRONMENT=development

# Common scripts for both environments
COPY ./scripts/01_init.sql /docker-entrypoint-initdb.d/
COPY ./scripts/02_functions.sql /docker-entrypoint-initdb.d/
COPY ./scripts/02_trigger.sql /docker-entrypoint-initdb.d/
COPY ./scripts/03_user_creation.sql /docker-entrypoint-initdb.d/
COPY ./scripts/04_seed.sql /docker-entrypoint-initdb.d/

# Environment-specific data scripts using existing filenames
COPY ./scripts /scripts

# Environment-specific selection
RUN if [ "$ENVIRONMENT" = "development" ]; then \
        cp /scripts/05_dev_data.sql /docker-entrypoint-initdb.d/; \
    elif [ "$ENVIRONMENT" = "production" ]; then \
        cp /scripts/06_prod_data.sql /docker-entrypoint-initdb.d/; \
    fi
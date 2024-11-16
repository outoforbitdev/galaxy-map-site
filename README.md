# app-galaxy-map

<p align="center">
  <!-- <a href="https://github.com/outoforbitdev/app-galaxy-map/actions?query=workflow%3ATest+branch%3Amaster">
    <img alt="Build states" src="https://github.com/outoforbitdev/app-galaxy-map/workflows/Test/badge.svg">
  </a>
  <a href="https://github.com/outoforbitdev/app-galaxy-map/actions">
    <img alt="Build states" src="https://github.com/outoforbitdev/app-galaxy-map/workflows/Release/badge.svg">
  </a> -->
  <a href="https://securityscorecards.dev/viewer/?uri=github.com/outoforbitdev/app-galaxy-map">
    <img alt="OpenSSF Scorecard" src="https://api.securityscorecards.dev/projects/github.com/outoforbitdev/app-galaxy-map/badge">
  </a>
  <a href="https://github.com/outoforbitdev/app-galaxy-map/releases/latest">
    <img alt="Latest release" src="https://img.shields.io/github/v/release/outoforbitdev/app-galaxy-map?logo=github">
  </a>
  <a href="https://github.com/outoforbitdev/app-galaxy-map/issues">
    <img alt="Open issues" src="https://img.shields.io/github/issues/outoforbitdev/app-galaxy-map?logo=github">
  </a>
</p>

A web application for viewing the galaxy far, far away.

## Getting started

### Install dependencies
This application is almost entirely containerized, so very view dependencies are needed. In the future we hope to containerize more of these tools. These are the ones that you will need:
- For the basics:
    - [Docker (with docker compose)](https://docs.docker.com/compose/install/)
    - [just](https://github.com/casey/just?tab=readme-ov-file#installation)
    - [yarn](https://yarnpkg.com/getting-started/install)
- For db migrations:
    - [dotnet](https://learn.microsoft.com/en-us/dotnet/core/install/)
    - [dotnet-ef](https://learn.microsoft.com/en-us/ef/core/cli/dotnet#installing-the-tools)

### Useful commands
We use [`just`](https://github.com/casey/just) as our command runner. It's very similar to `make` with a little less overhead and nuance.
- `just install`: Install pre-commit hooks
- `just lint`: Run the linter
- `just run`: Run the app locally (and automatically open the browser window)
- `just get-ip`: Get the network url of the local application so that you can view on another device (e.g. mobile)
You can explore the `Justfile` to see all available commands.

## Running local

1. Use `just run` to start up the local application. This will use `./docker-compose.yml` to start up the server and the database. The frontend will be available on http://localhost:1798.

1. If necessary, create the database and application user:
    ```
    docker exec -it app-galaxy-map-db-1 bash
    su postgres
    psql
    CREATE DATABASE galaxy;
    \c galaxy;
    CREATE USER app_galaxy_map_user WITH PASSWORD 'password';
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_galaxy_map_user;
    ```

1. At this point the database will not have the necessary schema or data. Generate SQL from the migrations to generate the schema: 
    ```
    dotnet ef migrations script --idempotent
    ```
1. Copy the resulting script and run it in the database container:
    ```
    docker exec -it app-galaxy-map-db-1 bash
    su postgres
    psql
    \c test
    <PASTE SQL HERE>
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_galaxy_map_user;
    ```
1. To add data to the database, either do it one at a time with SQL commands or upload CSV. If uploading CSV, place it in `./db/` which is mounted on the database container.
1. To upload to the database, run the following sql (truncating tables if necessary):
    ```
    TRUNCATE solar_systems CASCADE;
    COPY solar_systems FROM '/data/db/Systems - Export.csv' DELIMITER ',' HEADER;
    COPY spacelanes FROM '/data/db/Systems - SpacelanesExport.csv' DELIMITER ',' HEADER;
    ```

## Creating a migration
```
dotnet ef migrations add $NAME
dotnet ef migrations script --idempotent
```
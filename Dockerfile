FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-service
WORKDIR /app

COPY ./src/service .
RUN dotnet restore

WORKDIR /app
RUN dotnet publish -c release -o /out --no-restore

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-client
WORKDIR /app

RUN curl --silent --location https://deb.nodesource.com/setup_20.x | bash - \
&& apt-get install -y nodejs
COPY ./src/client .
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build-service /out .
COPY --from=build-client /app/out ./wwwroot
ENTRYPOINT ["dotnet", "GalaxyMapSite.dll"]
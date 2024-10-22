FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
RUN curl --silent --location https://deb.nodesource.com/setup_20.x | bash - \
&& apt-get install -y nodejs
COPY ./run.sh .
RUN chmod +x ./run.sh
ENTRYPOINT [ "./run.sh" ]

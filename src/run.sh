#! /bin/bash

cd src/client && npm run dev &
cd src/service && dotnet run

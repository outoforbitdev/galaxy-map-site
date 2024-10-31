#!/bin/bash

node ./next/server.js &
dotnet GalaxyMapSiteApi.dll

app_name := "galaxy-map-site"
port := "1798"
api_port := "1799"

run: stop
    docker build -t {{app_name}} src
    docker run -d -p {{port}}:3000 -p {{api_port}}:5039 -v ./src:/app/src --name {{app_name}} {{app_name}}
    docker container exec {{app_name}} wget http://localhost:3000 &> /dev/null
    docker container exec {{app_name}} wget http://localhost:5039/weatherforecast &> /dev/null
    open http://localhost:{{port}}

build: clean
    # Build image
    docker build -t {{app_name}} .
    # Run image
    docker run -d -p {{port}}:3000 -p {{api_port}}:8080 --name {{app_name}} {{app_name}}
    # Wait for the server to start
    # docker container exec {{app_name}} wget http://localhost:8080 &> /dev/null
    open http://localhost:{{port}}

clean: stop
	-docker rmi {{app_name}}

stop:
	-docker stop {{app_name}}
	-docker rm {{app_name}}
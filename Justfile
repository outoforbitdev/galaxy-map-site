app_name := "galaxy-map-site"
port := "1798"

run: clean
    # Build image
    docker build -t {{app_name}} .
    # Run image
    docker run -d -p {{port}}:8080 --name {{app_name}} {{app_name}}
    # Wait for the server to start
    # docker container exec {{app_name}} wget http://localhost:8080 &> /dev/null
    open http://localhost:{{port}}

clean: stop
	-docker rmi {{app_name}}

stop:
	-docker stop {{app_name}}
	-docker rm {{app_name}}
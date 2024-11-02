app_name := "galaxy-map-site"
port := "1798"
api_port := "1799"

install:
    yarn install
    yarn husky install
    yarn husky init
    echo "yarn commitlint --edit \$1 --config ./.linters/config/commitlint.config.js" > .husky/commit-msg
    echo "just lint" > .husky/pre-commit

run: stop
    docker build -t {{app_name}} src
    docker run -d -p {{port}}:3000 -p {{api_port}}:5039 -v ./src:/app/src --name {{app_name}} {{app_name}}
    open http://localhost:{{port}}

build: clean
    # Build image
    docker build -t outoforbitdev/{{app_name}}:$(git rev-parse --short HEAD) .
    # Run image
    docker run -d -p {{port}}:3000 -p {{api_port}}:8080 --name {{app_name}} outoforbitdev/{{app_name}}:$(git rev-parse --short HEAD) 
    # Wait for the server to start
    # docker container exec {{app_name}} wget http://localhost:8080 &> /dev/null
    open http://localhost:{{port}}

clean: stop
	-docker rmi {{app_name}}

stop:
	-docker stop {{app_name}}
	-docker rm {{app_name}}

get-ip:
    echo "http://$(ipconfig getifaddr en0):{{port}}"

lint:
    docker run -v $(pwd):/app -v $(pwd)/.linters:/polylint/.linters outoforbitdev/polylint:0.1.0

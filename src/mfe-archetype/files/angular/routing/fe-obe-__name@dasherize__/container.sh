docker build -t fe-obe-container-dev -f ./container/Dockerfile ./container
docker run --rm -p 3008:3008 fe-obe-container-dev

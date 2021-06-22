#container build & run
docker build -t fe-obe-container-dev -f ../container/Dockerfile.dev ../container
docker run --rm -p 3008:3008 fe-obe-container-dev

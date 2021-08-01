#container build & run
docker build -t fe-obe-container-prod -f ../container/Dockerfile.prod ../container
docker run --rm -p 3008:80 fe-obe-container-prod

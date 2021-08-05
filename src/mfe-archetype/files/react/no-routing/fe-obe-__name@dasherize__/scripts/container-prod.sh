#container build & run
docker build -t fe-obe-container-prod -f ../container/Dockerfile.prod ../container
docker run -d --rm -p 3008:80 fe-obe-container-prod
#mfe build & run
cd ..
npm run build
docker build -t fe-obe-esquema-firmas .
docker run -d --rm -p 80:80 fe-obe-esquema-firmas

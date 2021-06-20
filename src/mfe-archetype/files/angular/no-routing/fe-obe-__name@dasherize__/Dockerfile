FROM docker-spv.artifactory.gscorp.ad/nginx-spv:1.20.0

RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./nginx/default.conf /etc/nginx/conf.d/

RUN mkdir -p /usr/share/nginx/html/obe/modulos/<%= name %>/
COPY ./dist/fe-obe-<%= name %>/ /usr/share/nginx/html/obe/modulos/<%= name %>/
COPY settings.json /usr/share/nginx/html/settings.json

EXPOSE 80

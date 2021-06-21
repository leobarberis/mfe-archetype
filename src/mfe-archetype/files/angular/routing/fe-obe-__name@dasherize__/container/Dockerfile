FROM node:14
ENV FW <%= fw %>
ENV NAME <%= name %>
ENV PORT <%= port %>
ENV ROUTING <%= routing %>
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
RUN npm install -g @angular-devkit/schematics-cli
RUN npm install -g mfe-archetype
RUN schematics mfe-archetype:new-container-dev --fw=$FW --name=$NAME --port=$PORT --routing=$ROUTING
WORKDIR /usr/src/app/container
EXPOSE 3008
CMD [ "npm", "start" ]

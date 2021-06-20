FROM node:14
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
RUN npm install -g @angular-devkit/schematics-cli
RUN npm install -g mfe-archetype
RUN schematics mfe-archetype:new-container
WORKDIR /usr/src/app/container
EXPOSE 3008
CMD [ "npm", "start" ]

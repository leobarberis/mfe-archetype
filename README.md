# OBE: React & Angular MFE Schematics

### Schematic implementation that allows you to create React & Angular MFEs in OBE

## **Install Angular Schematics**

`$ npm install -g @angular-devkit/schematics-cli`

### **Commands**

### **mfe**

`$ schematics mfe-archetype:mfe`

It creates a new mfe and adds it to the container configuration (if the container doesn't exists, it generates a new one)

### **new-mfe**

`$ schematics mfe-archetype:new-mfe`

It creates a new mfe without adds it to the container configuration

### **add-mfe**

`$ schematics mfe-archetype:add-mfe`

It adds an existing mfe to an existing container configuration

### **delete-mfe**

`$ schematics mfe-archetype:delete-mfe`

It deletes an existing mfe from an existing container configuration (It doesn't deletes the MFE itself, just the container config related to it)

### **new-container**

`$ schematics mfe-archetype:new-container`

It creates a new container without any MFE attached to it

[![](https://cdn.memegenerator.es/imagenes/memes/full/32/23/32234012.jpg)](https://cdn.memegenerator.es/imagenes/memes/full/32/23/32234012.jpg "NO ME LA CONTAINER")

FROM node:latest

WORKDIR /app

COPY . /app

EXPOSE 4444

RUN npm install
# Ogni volta che viene eseguita una di queste azioni viene creato un nuovo layer.                                                                
CMD [ "node", "app.js" ]
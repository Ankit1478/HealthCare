
FROM node:18.16.0-alpine3.17


WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


COPY .env .env


EXPOSE 3000

# Define the command to run the application
CMD ["node", "server.js"]
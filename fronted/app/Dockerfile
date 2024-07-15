FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
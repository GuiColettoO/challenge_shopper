FROM node:latest

WORKDIR /app/client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3001
CMD ["npx", "serve", "-s", "dist", "-l", "3001"]
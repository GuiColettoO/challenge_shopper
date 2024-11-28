FROM node:latest

WORKDIR /app/server

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]

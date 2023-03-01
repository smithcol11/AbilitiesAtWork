FROM node:18.14.2

WORKDIR /usr/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080 3000

CMD ["node", "server.js"]

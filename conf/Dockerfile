FROM node:17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9999

RUN npm install jsonwebtoken

CMD ["npm", "start"]

FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g nodemon && npm install

COPY . .

EXPOSE 5001

CMD ["nodemon", "index.js"]

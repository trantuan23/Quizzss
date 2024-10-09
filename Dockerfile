FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
RUN npm install --global nodemon
CMD ["nodemon", "--config", "nodemon.json"]

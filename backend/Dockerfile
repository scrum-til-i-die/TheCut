FROM node:10

WORKDIR /app

RUN mkdir Uploads/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "startserver" ]
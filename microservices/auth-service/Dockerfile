FROM node:16
WORKDIR /app
COPY package*.json /app
RUN npm install
RUN npm install bcryptjs --save
COPY . /app
EXPOSE 4001
CMD ["node", "server.js"]

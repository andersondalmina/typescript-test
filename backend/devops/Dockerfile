FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8000

CMD ["node", "app.js"]
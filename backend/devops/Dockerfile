FROM node:12

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# RUN yarn tsc

EXPOSE 8000

CMD [ "yarn", "dev" ]

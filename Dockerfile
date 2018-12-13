FROM node:10.14.1

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
COPY . /app
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
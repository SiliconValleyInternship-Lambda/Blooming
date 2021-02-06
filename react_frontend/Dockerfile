FROM node:latest

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

COPY ./react_frontend/package*.json ./
RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]
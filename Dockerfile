FROM node:14.4.0-alpine

WORKDIR /webapp

COPY . .

RUN npm install -g @vue/cli
CMD ["npm", "run", "serve"]

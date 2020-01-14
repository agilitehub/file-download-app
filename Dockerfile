FROM node:10.15.2-alpine
ENV PORT 80
EXPOSE 80

WORKDIR /app
COPY . .

RUN npm install --production
CMD node app.js
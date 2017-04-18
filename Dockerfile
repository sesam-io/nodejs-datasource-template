FROM node:4-slim
MAINTAINER Graham Moore "graham.moore@sesam.io"
COPY ./service /service
WORKDIR /service
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]

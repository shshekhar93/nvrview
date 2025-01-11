FROM node:lts-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 

COPY . .
RUN npm run build

EXPOSE 3000
ENV RTSP_BASE_URL="<INSERT NVR URL HERE>"
VOLUME /app/config
CMD ["npm", "start"]


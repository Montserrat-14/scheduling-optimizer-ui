FROM node:12.16.1-alpine As builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=builder /usr/src/app/dist/system-optimizer-ui/ /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

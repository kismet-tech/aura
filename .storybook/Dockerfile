FROM node:21.5.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build-storybook

RUN yarn global add http-server

EXPOSE 8080

CMD ["http-server", "storybook-static", "-p", "8080"]

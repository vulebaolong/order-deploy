FROM node:24.1.0-alpine as BUILD

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production


FROM node:24.1.0-alpine

WORKDIR /app

COPY --from=BUILD ./app/dist ./dist
COPY --from=BUILD ./app/node_modules ./node_modules

CMD ["node", "dist/src/main"]


# RUN: là lệnh chạy trong lúc build
# CMD: sẽ chạy khi container start

# - thay đổi code
# - thay đổi thư viện (cài thêm thư viện)

# 1.84 GB
# 886.22 MB
# 908.69 MB
# 551.53 MB
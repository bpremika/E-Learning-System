FROM node:18.12.1
ENV DATABASE_URL=
ENV PORT=


COPY ./package.json ./package.json

RUN npm install


COPY . .

RUN npx prisma generate

RUN npm run build


CMD DATABASE_URL=${DATABASE_URL} PORT=${PORT} npm run start:prod
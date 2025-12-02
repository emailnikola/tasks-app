# Tasks App

## Description

```bash

Demo project to keep track of tasks.

Backend: NestJS, Microservices, Prisma ORM, PostgreSQL
Frontend: NextJS, MantineUI, Tailwind, SSR 

```

## RUN THE PROJECT - Docker

```bash

cd fe_tasks-app
npm i
cd ..

cd be_tasks-app
npm i
cd ..

.demo.env -> .env

docker-compose up --build

```

## RUN without Docker

```bash

cd be_tasks-app
npm i
.demo.env -> .env
Update .env
npx prisma generate --schema apps/users/src/prisma/schema.prisma
npx prisma generate --schema apps/tasks/src/prisma/schema.prisma
Terminal 1 => npm run start app --watch
Terminal 2 => npm run start users --watch
Terminal 3 => npm run start tasks --watch
Terminal 4 => npm run start auth --watch

cd fe_tasks-app
Terminal 5 => npm run dev

```

## License

```bash

This project is made available under the MIT license.

```

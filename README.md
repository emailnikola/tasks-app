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
npx prisma generate --schema apps/users/src/prisma/schema.prisma
npx prisma generate --schema apps/tasks/src/prisma/schema.prisma
cd ..
docker-compose up --build
```

## RUN without Docker

```bash
Start
cd be_tasks-app
npm run start app --watch
npm run start users --watch
npm run start tasks --watch
npm run start auth --watch
cd fe_tasks-app
npm run dev
```

## License
This project is made available under the MIT license.
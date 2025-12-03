# Tasks App

## Description

```bash

Demo project to keep track of tasks.

Backend: NestJS, Microservices, Prisma ORM, PostgreSQL
Frontend: NextJS, MantineUI, Tailwind, SSR 

```

## Develeop

```bash

.demo.env -> .env
Update .env

cd be_tasks-app
npm i
cd ..


npm run prisma:reseed
Terminal 1 => npm run start:dev app
Terminal 2 => npm run start:dev users
Terminal 3 => npm run start:dev tasks
Terminal 4 => npm run start:dev auth

cd fe_tasks-app
Terminal 5 => npm run dev

```

## Production

```bash

.demo.env -> .env

cd fe_tasks-app
npm i
cd ..

cd be_tasks-app
npm i
cd ..

docker-compose up --build

```

## License

```bash

This project is made available under the MIT license.

```

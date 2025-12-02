# Tasks app

## RUN THE PROJECT

cd fe_tasks-app
npm i
cd ..
cd be_tasks-app
npm i
npx prisma generate --schema apps/users/src/prisma/schema.prisma
npx prisma generate --schema apps/tasks/src/prisma/schema.prisma
cd ..
docker-compose build
docker-compose up

Backend
npm run start app    -> 3000
npm run start users  -> 3001
npm run start tasks  -> 3002
npm run start auth   -> 3003


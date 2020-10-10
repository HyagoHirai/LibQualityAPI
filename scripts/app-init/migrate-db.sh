#!/bin/sh

echo "Running Development Migrate"
npx sequelize-cli db:migrate --env development

npm start
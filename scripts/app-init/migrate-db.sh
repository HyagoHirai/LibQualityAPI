#!/bin/sh

npx sequelize-cli db:migrate --env test

npx sequelize-cli db:migrate --env development
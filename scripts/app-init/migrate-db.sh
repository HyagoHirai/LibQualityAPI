#!/bin/bash

RETRIES=5

echo "Running Development Migrate"
until [ $RETRIES -eq 0 ]; do
    echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
    sleep 3
done
echo "Done"

npx sequelize-cli db:migrate --env development

npm start


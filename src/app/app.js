if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const bodyParser = require('body-parser');
const express = require('express');
const cron = require('node-cron');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { updateDataByDate } = require('./services/updateDataService');

// const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(bodyParser.json());

// routes
const index = require('./routes/index');
const repositoryDataRoute = require('./routes/repositoryDataRoute');
const repositoryUserRoute = require('./routes/repositoryUserRoute');

app.use('/', index);
app.use('/api', repositoryDataRoute);
app.use('/api', repositoryUserRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const task = cron.schedule('0 0 */1 * * *', () => {
    updateDataByDate(Date.now());
});

task.start();

module.exports = app;

const express = require('express');

const router = express.Router();
const { getRepositoryIssuesData, getRepositoryStatisticsData } = require('../controllers/repositoryDataController');

router.get('/:owner/:repository/issues', getRepositoryIssuesData);

router.get('/:owner/:repository/statistics', getRepositoryStatisticsData);

module.exports = router;

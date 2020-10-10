const { getRepositoryOpenIssues, getRepositoryMetrics } = require('../services/githubService');
const { getAllUserRepositories } = require('../services/repositoryUserService');
const { getRepositoryStatistics } = require('../services/repositoryStatisticsService');
const { insertSearchHistory } = require('../services/searchHistoryService');
const log = require('../utils/logger')(module);

/**
 * Stores in the database the repository searched by the user
 * @param {String} req.params.repository - Repository owner name
 * @param {String} req.params.owner - Repository name
 * @param {String} req.query.user - Username
 * @returns {Object} Open issues, average and standard abreviation
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryIssuesData(req, res) {
    try {
        const { owner, repository } = req.params;
        const { user } = req.query;
        const openIssues = await getRepositoryOpenIssues(owner, repository);
        const { avg, stdDeviation } = await getRepositoryMetrics(owner, repository, openIssues);
        insertSearchHistory(owner, repository, user);
        return res.json({
            openIssues,
            avg,
            stdDeviation,
        });
    } catch (error) {
        log.error(error.message);
        return res.status(error.statusCode).json({ error: error.message });
    }
}

/**
 * Get statistics from user repositories stored in database
 * @param {String} req.query.user - Username
 * @returns {Array} Number of open issues grouped by date
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryStatisticsData(req, res) {
    try {
        const { user } = req.query;
        const userRepositories = await getAllUserRepositories(user);
        const data = await Promise.all(userRepositories.map(async (value) => getRepositoryStatistics(value.owner, value.repository)));
        return res.json({
            data,
        });
    } catch (error) {
        log.error(error.message);
        return res.status(error.statusCode).json({ error: error.message });
    }
}

module.exports = {
    getRepositoryIssuesData,
    getRepositoryStatisticsData,
};

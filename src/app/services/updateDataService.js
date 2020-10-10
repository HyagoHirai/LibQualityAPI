const { getRepositoryOpenIssues, getRepositoryStatistics, getRepositoryStatisticsByDate } = require('./githubService');
const { getAllDistinctRepositories } = require('./repositoryUserService');
const { insertRepositoryStatistics, truncateRepositoryStatistics, updateRepositoryStatistics } = require('./repositoryStatisticsService');
const log = require('../utils/logger')(module);

/**
 * Get all repositories chosen by users and update repository_statistics table with the number of issues open each day
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function updateData() {
    log.info('Starting updateData ... ');
    const repositories = await getAllDistinctRepositories();
    await truncateRepositoryStatistics();
    await Promise.all(repositories.map(async (value) => {
        const { owner, repository } = value;
        const openIssues = await getRepositoryOpenIssues(owner, repository);
        const statistics = await getRepositoryStatistics(owner, repository, openIssues);
        await Promise.all(Object.keys(statistics).map(async (date) => insertRepositoryStatistics(owner, repository, date, statistics[date])));
    }));
    log.info('Done');
}

/**
 * Get all repositories chosen by users and update repository_statistics table with the number of open issues for a specific date
 * @param {String} date - Repository owner name
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function updateDataByDate(date) {
    log.info('Starting updateDataByDate ... ');
    const repositories = await getAllDistinctRepositories();
    const dateNow = new Date(date).toISOString().slice(0, 10);
    await Promise.all(repositories.map(async (value) => {
        const { owner, repository } = value;
        const statistics = await getRepositoryStatisticsByDate(owner, repository, dateNow, 'open');
        const [updatedRows] = await updateRepositoryStatistics(owner, repository, dateNow, statistics || 0);
        if (updatedRows === 0) {
            await insertRepositoryStatistics(owner, repository, dateNow, statistics);
        }
    }));
    log.info('Done');
}

module.exports = {
    updateData,
    updateDataByDate,
};

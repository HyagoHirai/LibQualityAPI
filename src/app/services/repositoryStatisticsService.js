const { RepositoryStatistics } = require('../models');
const log = require('../utils/logger')(module);

/**
 * Get all statistics from repository
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @returns {Number} Return all statistics from repository
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getRepositoryStatistics(owner, repository) {
    try {
        return await RepositoryStatistics.findAll({
            where: {
                owner,
                repository,
            },
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Store in the database statistics from repository
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} date - Statistics date
 * @param {String} openIssues - Repository open issues on that date
 * @returns {Number} Return an object with the stored data
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function insertRepositoryStatistics(owner, repository, date, openIssues) {
    try {
        return await RepositoryStatistics.create({
            owner, repository, date, open_issues: openIssues,
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Truncate repository_statistics table
 * @returns {Number} If success return 0
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function truncateRepositoryStatistics() {
    try {
        return await RepositoryStatistics.destroy({ truncate: true });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Update in the database statistics from repository
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} date - Statistics date
 * @param {String} openIssues - Repository open issues on that date
 * @returns {Number} Return an object with the stored data
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function updateRepositoryStatistics(owner, repository, date, openIssues) {
    try {
        return await RepositoryStatistics.update({ open_issues: openIssues }, {
            where: {
                owner,
                repository,
                date,
            },
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

module.exports = {
    getRepositoryStatistics,
    insertRepositoryStatistics,
    truncateRepositoryStatistics,
    updateRepositoryStatistics,
};

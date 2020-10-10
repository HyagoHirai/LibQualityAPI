const { SearchHistory } = require('../models');
const log = require('../utils/logger')(module);

/**
 * Stores in the database the repository searched by the user
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} user - Username
 * @returns {Object} If success returns the stored data
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function insertSearchHistory(owner, repository, user) {
    try {
        const response = await SearchHistory.create({ owner, repository, user });
        return response;
    } catch (error) {
        log.error(error);
        throw Error(error);
    }
}

module.exports = {
    insertSearchHistory,
};

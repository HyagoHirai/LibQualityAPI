const { RepositoryUser } = require('../models');
const log = require('../utils/logger')(module);

/**
 * Store in the database user repository
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} user - Username
 * @returns {Number} Return an object with the stored data
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function insertUserRepository(owner, repository, user) {
    try {
        return await RepositoryUser.create({ owner, repository, user });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Delete in the database user repository
 * @param {String} owner - Repository owner name
 * @param {String} repository - Repository name
 * @param {String} user - Username
 * @returns {Number} Returns an object with a number of deleted repositories
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function deleteUserRepository(owner, repository, user) {
    try {
        return await RepositoryUser.destroy({
            where: {
                owner,
                repository,
                user,
            },
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Get all repositories chosen by the user
 * @param {String} user - Username
 * @returns {Number} Returns an array of repositories
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getAllUserRepositories(user) {
    try {
        return await RepositoryUser.findAll({
            attributes: ['owner', 'repository'],
            where: {
                user,
            },
            group: ['owner', 'repository'],
            raw: true,
            nest: true,
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

/**
 * Get all dinstinct repositories chosen by the users
 * @returns {Number} Returns an array of repositories
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function getAllDistinctRepositories() {
    try {
        return await RepositoryUser.findAll({
            attributes: ['owner', 'repository'],
            group: ['owner', 'repository'],
        });
    } catch (error) {
        log.error(error);
        throw error;
    }
}

module.exports = {
    insertUserRepository,
    deleteUserRepository,
    getAllUserRepositories,
    getAllDistinctRepositories,
};

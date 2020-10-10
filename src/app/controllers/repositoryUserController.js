const { insertUserRepository, deleteUserRepository } = require('../services/repositoryUserService');
const log = require('../utils/logger')(module);

/**
 * Store in the database the repository chosen by the user
 * @param {String} req.params.repository - Repository owner name
 * @param {String} req.params.owner - Repository name
 * @param {String} req.query.user - Username
 * @returns {Object} Return an object with the stored data
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function storeUserRepository(req, res) {
    try {
        const { owner, repository } = req.params;
        const { user } = req.body;
        const response = await insertUserRepository(owner, repository, user);
        return res.json({ response });
    } catch (error) {
        log.error(error.message);
        return res.status(error.statusCode).json({ error: error.message });
    }
}

/**
 * Remove in the database the repository chosen by the user
 * @param {String} req.params.repository - Repository owner name
 * @param {String} req.params.owner - Repository name
 * @param {String} req.query.user - Username
 * @returns {Object} Returns an object with a number of deleted repositories
 * @author Hyago Hirai <hyaghirai@gmail.com>
 */
async function removeUserRepository(req, res) {
    try {
        const { owner, repository } = req.params;
        const { user } = req.query;
        const response = await deleteUserRepository(owner, repository, user);
        return res.json({ response });
    } catch (error) {
        log.error(error.message);
        return res.status(error.statusCode).json({ error: error.message });
    }
}

module.exports = {
    storeUserRepository,
    removeUserRepository,
};

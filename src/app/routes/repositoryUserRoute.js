const express = require('express');

const router = express.Router();
const { storeUserRepository, removeUserRepository } = require('../controllers/repositoryUserController');

router.post('/:owner/:repository/user', storeUserRepository);

router.delete('/:owner/:repository/user', removeUserRepository);

module.exports = router;

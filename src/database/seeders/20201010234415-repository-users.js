module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('repository_users', [{
        owner: 'angular',
        repository: 'angular',
        user: 'hyagohirai',
        created_at: new Date(),
        updated_at: new Date(),
    }]),

    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('repository_users', null, {}),
};

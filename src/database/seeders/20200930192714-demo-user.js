module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
        name: 'Hyago Hirai',
        email: 'hyago.hirai@icarotech.com',
        phone: 971452126,
        created_at: new Date(),
        updated_at: new Date(),
    }]),

    down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};

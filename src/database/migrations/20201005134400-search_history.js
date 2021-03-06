module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('search_histories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        owner: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        repository: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        user: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
    }),

    down: async (queryInterface) => queryInterface.dropTable('search_histories'),
};

module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.createTable('repository_statistics', {
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
        date: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        open_issues: {
            allowNull: false,
            type: Sequelize.INTEGER,
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

    down: async (queryInterface) => queryInterface.dropTable('repository_statistics'),
};

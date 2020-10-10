module.exports = (sequelize, DataTypes) => {
    const RepositoryUser = sequelize.define('RepositoryUser', {
        owner: DataTypes.STRING,
        repository: DataTypes.STRING,
        user: DataTypes.STRING,
    });

    return RepositoryUser;
};

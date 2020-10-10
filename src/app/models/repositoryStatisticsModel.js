module.exports = (sequelize, DataTypes) => {
    const RepositoryStatistics = sequelize.define('RepositoryStatistics', {
        owner: DataTypes.STRING,
        repository: DataTypes.INTEGER,
        date: DataTypes.STRING,
        open_issues: DataTypes.INTEGER,
    });

    return RepositoryStatistics;
};

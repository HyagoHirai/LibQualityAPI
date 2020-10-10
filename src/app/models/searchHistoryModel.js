module.exports = (sequelize, DataTypes) => {
    const SearchHistory = sequelize.define('SearchHistory', {
        owner: DataTypes.STRING,
        repository: DataTypes.STRING,
        user: DataTypes.STRING,
    });

    return SearchHistory;
};

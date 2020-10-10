if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    test: {
        dialect: 'postgres',
        host: '127.0.0.1',
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'test',
        operatorAliases: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
    },
    development: {
        dialect: 'postgres',
        host: 'db',
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'development',
        operatorAliases: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
    },
};

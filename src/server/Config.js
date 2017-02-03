require('dotenv');

module.exports = class Config {
    getDbHost() {
        return process.env.DB_HOST || 'localhost';
    }
};

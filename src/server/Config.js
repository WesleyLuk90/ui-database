require('dotenv');

module.exports = class Config {
    getDbHost() {
        return this.env('DB_HOST', 'localhost');
    }
    getDbUser() {
        return this.env('DB_USER', 'user');
    }
    getDbPassword() {
        return this.env('DB_PASSWORD', 'password');
    }
    getDbDatabase() {
        return this.env('DB_DATABASE', 'uidatabase');
    }
    getDbPort() {
        return this.env('DB_PORT', '27015');
    }
    getListenPort() {
        return this.env('LISTEN_PORT', 80);
    }
    getHostname() {
        return this.env('HOSTNAME', 80);
    }

    env(key, defaultValue) {
        if (process.env[key] != null) {
            return process.env[key];
        }
        return defaultValue;
    }
};

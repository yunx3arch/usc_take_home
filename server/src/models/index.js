const { Sequelize } = require('sequelize');

const path = require('path');
const currentDirectory = __dirname;
const relativePathToEnvFile = path.join(currentDirectory, '.env');
require('dotenv').config({path:relativePathToEnvFile});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

async function authenticateNewDatabase() {
  try {
    // Authenticate the new connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticateNewDatabase();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);

module.exports = db;

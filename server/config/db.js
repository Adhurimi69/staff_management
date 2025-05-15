// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('staff_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to the MySQL database using Sequelize.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err.message);
  });

module.exports = sequelize;

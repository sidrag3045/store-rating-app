const app = require('./app');
const dotenv = require('dotenv');
const {sequelize} = require('./database/models/index.js');


const PORT = process.env.SERVER_PORT || 3000;

// This file is responsible for establishing a connection to the database using Sequelize.
const loadDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.... ✅');
  } catch (error) {
    console.error('Unable to connect to the database ❌ : ', error);
    process.exit(1); // Exit the app if DB connection fails
  }
};


async function startServer() {
  try {
    // Connecting to DB
    await loadDatabase();

    // Starting the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

const path = require('path');
const currentDirectory = __dirname;
const relativePathToEnvFile = path.join(currentDirectory, '.env');
require('dotenv').config({path:relativePathToEnvFile});
const cors = require('cors');

const express = require('express');
const app = express();
const authRoutes = require('./auth');
const protectedRoutes = require('./protected');
const db = require('./models/index');

const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);



async function syncDatabase() {
  try {
    await db.sequelize.sync({ force: true }); 

    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

syncDatabase();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

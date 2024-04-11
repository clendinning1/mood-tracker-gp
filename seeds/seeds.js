require('dotenv').config();
const sequelize = require('../config/connection');
const User = require('../models/User');
const MoodLog = require('../models/moodlog');
const userData = require('./userData.json');
const moodLogData = require('./moodlogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const moodLog of moodLogData) {
    await MoodLog.create({
      ...moodLog, 
      userId: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();


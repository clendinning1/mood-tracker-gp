const { sequelize } = require('../config/connection');
const User = require('../models/User');
const MoodLog = require('../models/moodlog');
const userData = require('./userData.json');
const moodLogData = require('./moodlogData.json');

console.log("sequelize:", sequelize);

const seedDatabase = async () => {
  await sequelize.fileSync({ force: true });

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


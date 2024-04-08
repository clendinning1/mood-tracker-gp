const User = require('./User');
const MoodLog = require('./moodlog');

User.hasMany(MoodLog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

MoodLog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, MoodLog };
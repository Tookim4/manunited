require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/UserModel');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const { ADMIN_EMAIL, ADMIN_PASS } = process.env;

    const exists = await User.findOne({ email: ADMIN_EMAIL });
    if (exists) return console.log('Admin already exists:', exists.email), process.exit();

    await User.create({
      username: 'admin',
      email: ADMIN_EMAIL,
      password: ADMIN_PASS, // plain password, will be hashed by pre('save')
      role: 'admin'
    });

    console.log('✅ Admin created:', ADMIN_EMAIL);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

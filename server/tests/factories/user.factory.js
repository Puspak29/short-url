const User = require('../../src/models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (overrides = {}) => {
    const hashedPassword = await bcrypt.hash('Password@123', 10);
    const user = await User.create({
        name: 'Test User',
        email: "test@example.com",
        password: hashedPassword,
        plan: 'pro',
        monthlyResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set reset date to 30 days from now
        ...overrides
    })
    return user;
};
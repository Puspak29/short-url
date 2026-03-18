const User = require('../../models/user');
const handleError = require('../../utils/handleError');
const sendResponse = require('../../utils/sendResponse');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');

exports.register = handleError(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return sendResponse(res, 400, false, 'Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const resetDate = new Date();
    resetDate.setMonth(resetDate.getMonth() + 1);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        selectedPlan: 'free',
        monthlyResetDate: resetDate
    });

    const token = generateToken({ id: user._id });

    sendResponse(res, 201, true, 'User registered successfully', { token });
}, 'Failed to register user');

exports.login = handleError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return sendResponse(res, 400, false, 'Invalid email or password');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return sendResponse(res, 400, false, 'Invalid email or password');
    }

    const token = generateToken({ id: user._id });
    sendResponse(res, 200, true, 'Login successful', { token });
}, 'Failed to login');
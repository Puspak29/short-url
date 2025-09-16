const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const NODE_ENV = process.env.NODE_ENV;
const FRONTEND_URL = process.env.FRONTEND_URL;

async function register(req, res){
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            name,
            email,
            salt,
            password: hashedPassword,
        });

        return res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

async function login(req, res){
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});
        
        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({message: "Login successful", user: {name: user.name, email: user.email}});
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

async function logout(req, res){
    res.clearCookie('token');
    return res.status(200).json({message: "Logout successful"});
}

module.exports = {
    register,
    login,
    logout,
}
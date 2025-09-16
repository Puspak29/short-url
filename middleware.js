const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_TOKEN = process.env.JWT_SECRET;

function middleWare(req, res, next){
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' });

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

module.exports = middleWare;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (data, expiresIn) => {
  try {
    const token = jwt.sign(data, JWT_SECRET);
    return token;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Server Error.');
  }
};

module.exports = generateToken;

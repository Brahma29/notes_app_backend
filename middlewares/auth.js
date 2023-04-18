const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = header.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log({ decodedToken });
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;

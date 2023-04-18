const generateToken = require('../middlewares/tokenGenerator');
const db = require('../services/firebase');
const bcrypt = require('bcryptjs');

async function signUp(req, res) {
  const { email, password, fullName } = req.body;

  try {
    const existingUserQuerySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!existingUserQuerySnapshot.empty) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = await db.collection('users').add({
      email,
      fullName,
      password: hashedPassword,
    });

    const newUserSnapshot = await newUserRef.get();
    const newUser = { id: newUserSnapshot.id, ...newUserSnapshot.data() };

    const token = generateToken(newUser.id);

    res.status(200).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userQuerySnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (userQuerySnapshot.empty) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const userSnapshot = userQuerySnapshot.docs[0];
    const user = { id: userSnapshot.id, ...userSnapshot.data() };

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = generateToken(user.id);

    delete user.password;
    return res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  signUp,
  signIn,
};

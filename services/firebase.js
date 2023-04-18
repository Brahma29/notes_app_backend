const firebase = require('firebase-admin');
const { FIRESTORE } = require('../config');

firebase.initializeApp({
  credential: firebase.credential.cert(FIRESTORE),
  databaseURL: process.env.DATABASE_URL,
});

const db = firebase.firestore();

module.exports = db;

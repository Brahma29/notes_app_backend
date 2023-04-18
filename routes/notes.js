const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createNewNote,
  getAllNotes,
  updateNote,
  getNoteById,
  deleteNote,
} = require('../controllers/notes');

router.post('/', auth, createNewNote);

router.get('/', auth, getAllNotes);
router.get('/:id', auth, getNoteById);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

module.exports = router;

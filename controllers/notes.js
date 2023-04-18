const {
  createNote,
  getNotesByUser,
  getUserNoteById,
  updateUserNote,
  deleteUserNote,
} = require('../models/note');

const createNewNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user;
    const note = await createNote(userId, title, description);
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const userId = req.user;
    const notes = await getNotesByUser(userId);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await getUserNoteById(id);
    if (note.message === 'Note not found') {
      return res.status(404).json(note);
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updatedNote = await updateUserNote(id, { title, description });
    if (updateNote.message === 'Note not found') {
      return res.status(404).json(note);
    }
    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMsg = await deleteUserNote(id);
    if (deleteMsg.message === 'Note not found') {
      return res.status(404).json(note);
    }
    res.status(200).json(deleteMsg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createNewNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};

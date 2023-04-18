const db = require('../services/firebase');

const createNote = async (userId, title, description) => {
  const noteRef = await db.collection('notes').add({
    userId,
    title,
    description,
    createdAt: new Date(),
  });
  const note = await noteRef.get();
  return { id: noteRef.id, ...note.data() };
};

const getNotesByUser = async (userId) => {
  const notesSnapshot = await db
    .collection('notes')
    .where('userId', '==', userId)
    .get();
  const notes = [];
  notesSnapshot.forEach((doc) => notes.push({ id: doc.id, ...doc.data() }));
  return notes;
};

const getUserNoteById = async (noteId) => {
  try {
    const noteSnapshot = await db.collection('notes').doc(noteId).get();

    if (!noteSnapshot.exists) {
      return { message: 'Note not found' };
    }

    return { id: noteSnapshot.id, ...noteSnapshot.data() };
  } catch (error) {
    throw new Error('Failed to get note by ID');
  }
};

const updateUserNote = async (noteId, updatedNote) => {
  try {
    const noteRef = db.collection('notes').doc(noteId);

    const noteSnapshot = await noteRef.get();

    if (!noteSnapshot.exists) {
      return { message: 'Note not found' };
    }

    await noteRef.update(updatedNote);

    return { id: noteSnapshot.id, ...updatedNote };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update note');
  }
};

const deleteUserNote = async (noteId) => {
  try {
    const noteRef = db.collection('notes').doc(noteId);

    const noteSnapshot = await noteRef.get();

    if (!noteSnapshot.exists) {
      return { message: 'Note not found' };
    }

    await noteRef.delete();

    return { message: 'Note Deleted Successfully' };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete note');
  }
};

module.exports = {
  createNote,
  getNotesByUser,
  getUserNoteById,
  updateUserNote,
  deleteUserNote,
};

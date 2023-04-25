import { getNotes, createNote, deleteNote, updateNote, searchNotes } from "../model/model.js";

export async function getAllNotes(req, res) {
    const username = req.user.username
    try {
        const notes = await getNotes(username)
        res.json({ notes: notes });
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export async function addNote(req, res) {
    try {
      const { title, text } = req.body;
      const username = req.user.username; // Användarens namn hämtas från req.user

      res.json(await createNote(title, text, username));
    } catch (err) {
      res.status(400).json({ error: err });
    }
}

export async function removeNoteById(req, res) {
    try {
      const id = req.params.noteid;
      console.log(id)
      const numRemoved = await deleteNote(id);
      if (numRemoved > 0) {
        res.json({ msg: "Note deleted successfully" });
      } else {
        res.status(404).json({ error: "Note not found" });
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
}

export async function updateNoteById(req, res) {
    try {
      const id = req.params.noteid;
      const { title, text } = req.body;
  
      await updateNote(id, title, text);
  
      res.json({ msg: "Note updated successfully" });
    } catch (err) {
      if (err.message === "Note not found") {
        res.status(404).json({ error: "Note not found" });
      } else if (err.message === "text and title is the same") {
        res.status(400).json({ error: "text and title is the same" });
      } else {
        res.status(400).json({ error: err });
      }
    }
}

export async function searchNotesByTitle(req, res) {
    try {
      const { query } = req.query;
      const username = req.user.username; // Användarens namn hämtas från req.user
      const notes = await searchNotes(query, username);
      res.json({notes: notes});
    } catch (err) {
      res.status(400).json({ error: err });
    }
}
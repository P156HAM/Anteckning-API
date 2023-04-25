import { Router } from 'express'
import { getAllNotes, addNote, removeNoteById, updateNoteById, searchNotesByTitle } from '../controllers/noteController.js'
import { authenticateToken } from '../middlewares/validateToken.js'
import { validateNoteInput } from '../middlewares/validateNote.js'


export const router = Router()

router.get('/', authenticateToken, getAllNotes)

router.get('/search', authenticateToken, searchNotesByTitle)

router.post('/', authenticateToken, validateNoteInput, addNote)

router.delete('/:noteid', (req, res, next) => {
    console.log(req.params)
    next()
}, authenticateToken, removeNoteById)

router.put('/:noteid', authenticateToken, validateNoteInput, updateNoteById)


import { Router } from 'express'
import { addUser, loginUser } from '../controllers/userController.js'


export const router = Router()

router.post('/signup', addUser)

router.post('/login', loginUser)


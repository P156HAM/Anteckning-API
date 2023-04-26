import { Router } from 'express'
import { addUser, loginUser } from '../controllers/userController.js'
import { validateUserInput } from '../middlewares/validateUser.js'


export const router = Router()

router.post('/signup', validateUserInput, addUser)

router.post('/login', validateUserInput, loginUser)


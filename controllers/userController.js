import jwt from 'jsonwebtoken';
import { createUser, validateUser } from "../model/model.js";

export function addUser(req, res) {
    createUser(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json(err))
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body
        const result = await validateUser(username, password)
        if(result.sucess) {
            const token = jwt.sign({ username: username }, 'key441234', {
                expiresIn: 1200 // 20 minuter
            })
            res.json({
                sucess: true,
                msg: 'Logged in!',
                token
            })
        } else {
            res.json({
                sucess: false, 
                msg: result.msg
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
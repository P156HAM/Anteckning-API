import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null) return res.status(400).json({
        msg: 'Please provide a key'
    })

    jwt.verify(token, 'key441234', (err, user) => {
        if(err) return res.status(400).json({
            msg: 'Not authorized'
        })
        req.user = user
        next()
    })
}
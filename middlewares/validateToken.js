import jwt from "jsonwebtoken"

export function authenticateToken(req, res, next) {
    console.log(" console log first i authenticateToken " , req.body)
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
        console.log(" console log second i authenticateToken " , req.body)
        console.log(req.params)
        next()
    })
}
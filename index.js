import express from 'express'
import { router as userRouter } from './routes/user.js'
import { router as noteRouter } from './routes/note.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './docs/docs.json' assert { type: "json" };
const app = express()
const PORT = 3000

app.use(express.json())

app.use('/api/notes', noteRouter)
app.use('/api/user', userRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.use((req, res) => {
    console.log(404)
    res.status(404).json({
        success: false,
        msg: "Sidan finns inte"
    })
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.json({ error: 'Please check our Swagger documentation for more info' });
});


app.listen(PORT, () => {
    console.log('listning on port: ' + PORT)
})
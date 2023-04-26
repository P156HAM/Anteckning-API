import swaggerAutogen from 'swagger-autogen';


const outputFile = './docs/docs.json'
const endpointsFiles = [
    './routes/note.js',
    './routes/user.js'
]

swaggerAutogen(outputFile, endpointsFiles)
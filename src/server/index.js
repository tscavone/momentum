const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(pino)
app.use(cors())

app.use('/login', (req, res) => {
    res.send({
        token: 'abc123',
    })
})

// app.get('/api/greeting', (req, res) => {
//     const name = req.query.name || 'World'
//     res.setHeader('Content-Type', 'application/json')
//     res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
// })

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)

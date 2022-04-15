const express = require('express')
const bodyParser = require('body-parser')
const pino = require('express-pino-logger')()
const cors = require('cors')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })
// app.use(pino)
app.use(cors())

app.post('/login', (req, res) => {
    console.log('req.method', req.method) // "DELETE"
    console.log('req.body', req.body)
    console.log('req.body.username', req.body.username)
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

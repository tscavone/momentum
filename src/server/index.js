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

// HERE trying to get environment vars to work to use them for login
app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    console.log('req.body', req.body)
    console.log('req.body.username', req.body.username)
    console.log('env USERNAME1', process.env.USERNAME1)

    if (
        username === process.env.USERNAME1 &&
        password === process.env.PASSWORD1
    ) {
        res.send({
            token: 'abc123',
            userId: process.env.USERID1,
        })
    } else if (
        username === process.env.USERNAME2 &&
        password === process.env.PASSWORD2
    ) {
        res.send({
            token: 'abc123',
            userId: process.env.USERID2,
        })
    } else {
        res.send(401)
    }
})

// app.get('/api/greeting', (req, res) => {
//     const name = req.query.name || 'World'
//     res.setHeader('Content-Type', 'application/json')
//     res.send(JSON.stringify({ greeting: `Hello ${name}!` }))
// })

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
)

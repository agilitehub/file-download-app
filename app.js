require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
const compression = require('compression')

app.use(compression())

// Serve the files out of ./public as our main files
app.use('/', express.static(path.join(__dirname, '/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'))
})

// Server Setup
const port = process.env.PORT || 80
const server = http.createServer(app)

server.listen(port, () => {
  console.log('Agilit-e File Download App listening on: ', port)
})

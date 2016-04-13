'use strict'

const fs = require('fs')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res, next) => {
  fs.readFile('./package.json', 'utf-8', (err, data) => {
    if (err) {
      return next(err)
    }

    let content

    try {
      content = JSON.parse(data)
    } catch (ex) {
      return next(ex)
    }

    res.json(content)
  })
})

app.use((err, request, response, next) => {
  console.log(err)
  response.sendStatus(500)
})

app.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  console.log(`server is listening on ${port}`)
})

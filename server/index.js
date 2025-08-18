const express = require('express')
const app = express()
const { PORT } = process.env

app.get('/', (req, res) => {
  res.send('Hello, Express from server!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

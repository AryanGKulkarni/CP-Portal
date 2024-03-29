const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 80


app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/bookmark', require('./routes/bookmark'))

app.get('/', (req, res) => {
  res.send('Hello Aryan')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`cp-portal app listening on http://localhost:${port}`)
})
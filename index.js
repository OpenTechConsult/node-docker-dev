const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 3000

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://sandro:qwerty@mongo:27017/?authSource=admin')
  console.log("succesfully connected to DB")
}

app.get('/', (req, res) => {
  res.send('<h2>Hi there FRIEND!!!</h2>')
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
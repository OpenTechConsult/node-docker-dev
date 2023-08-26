const express = require('express')
const mongoose = require('mongoose')
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config')

const postRouter = require('./routes/postRoutes')

const app = express()

const port = process.env.PORT || 3000

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

main().catch(err => {
  console.log(err)
  setTimeout(main, 5000)
})

async function main() {
  await mongoose.connect(mongoURL)
  console.log("succesfully connected to DB")
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h2>Hi there FRIEND!!!</h2>')
});

app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
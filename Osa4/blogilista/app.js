const config = require("./utils/config")
const express = require('express')
const app = express()

const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
//const middleware
const logger = require("./utils/logger")
const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info("Connected to MOngoDb")
})
.catch((error) => {
    logger.error("error connection to MOngoDB:", error.message)
})

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
//app.use(middleare.requestLogger)

app.use("/api/blogs", blogsRouter)

module.exports = app



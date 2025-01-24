//tÄTÄ EI TARVITTU VIELÄ

const mongoose = require("mongoose")
mongoose.set('strictQuery, fslse')
const url = process.env.MONGODB_URI

console.log('connected to', url)

mongoose.connect(url) 
    .then(result => {
        console.log("connected to MongoDb")
    })

const personSchema = new mongoose.Schema({
    author: { type: String
    },
    title: {
          type: String,
    },
    url: {
        type: String
    }, 
    votes: {
        type: String
    }
    }
    )

module.exports = mongoose.model('Blog', blogSchema)
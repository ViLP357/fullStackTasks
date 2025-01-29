//tÄTÄ EI TARVITTU VIELÄ
const mongoose = require("mongoose")

//const url = process.env.MONGODB_URI

//console.log('connected to', url)

const blogSchema = new mongoose.Schema({
    author: { type: String,
        require: true
    },
    title: {
          type: String,
    },
    url: {
        type: String
    }, 
    likes: {
        type: Number,
        require: true,
        set: val => val === null || val.length === 0 ? 0 : val
    }
    }
    )

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)


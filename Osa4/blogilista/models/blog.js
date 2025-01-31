//tÄTÄ EI TARVITTU VIELÄ
const mongoose = require("mongoose")

const blogSchema =new mongoose.Schema({
    author: { type: String,
        required: true
    },
    title: {
          type: String,
          required: true
    },
    url: {
        type: String,
        required: true
    }, 
    likes: {
        type: Number,
        //required: true,
        default: 0,
        set: val => val === null ? 0 : val 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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


const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//MongoDB Collection named here - will give lowercase plural of name
module.exports = mongoose.model("Blog", BlogSchema)

const cloudinary = require("../middleware/cloudinary")
const Blog = require("../models/Blog")

module.exports = {
  getBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("user")
      if (!blog) {
        res.status(404).json({ success: false, data: "Blog not found" })
      }

      res.status(200).json({ success: true, blog: blog || null })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  createBlog: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)

      const blog = await Blog.create({
        title: req.body.title,
        tag: req.body.tag,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      })
      if (!blog) {
        res.status(404).json({ success: false, data: "Failed to create Blog" })
      }

      console.log("Blog has been added!")
      res.status(200).json({ success: true, blog })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  likeBlog: async (req, res) => {
    try {
      const blog = await Blog.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        },
        { new: true }
      )
      if (!blog) {
        res.status(404).json({ success: false, data: "Blog not updated" })
      }

      console.log("Likes +1")
      res.status(200).json({ success: true, data: blog.likes })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deleteBlog: async (req, res) => {
    try {
      // Find blog by id
      let blog = await Blog.findById({ _id: req.params.id })
      if (!blog) {
        res.status(404).json({ success: false, data: "Blog not found" })
      }
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(blog.cloudinaryId)
      // Delete blog from db
      await Blog.deleteOne({ _id: req.params.id })
      console.log("Deleted Blog")
      res.status(200).json({ success: true, data: "Deleted Blog" })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}

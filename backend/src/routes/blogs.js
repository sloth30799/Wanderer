const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const blogsController = require("../controllers/blogs")
const { ensureAuth } = require("../middleware/auth")

//Blog Routes
//Since linked from server js treat each path as:
//blog/:id, blog/createBlog, blog/likeBlog/:id, blog/deleteBlog/:id
router.get("/:id", ensureAuth, blogsController.getBlog)

//Enables user to create blog w/ cloudinary for media uploads
router.post("/createBlog", upload.single("file"), blogsController.createBlog)

//Enables user to like blog. In controller, uses POST model to update likes by 1
router.put("/likeBlog/:id", blogsController.likeBlog)

//Enables user to delete blog. In controller, uses POST model to delete blog from MongoDB collection
router.delete("/deleteBlog/:id", blogsController.deleteBlog)

module.exports = router

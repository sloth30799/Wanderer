const Gear = require("../models/Gear")
const Blog = require("../models/Blog")
const Trip = require("../models/Trip")

module.exports = {
  getProfile: async (req, res) => {
    try {
      if (!req.user) res.status(200).json(null)
      const blogs = await Blog.find({ user: req.user.id }).lean()

      const trips = await Trip.find({ user: req.user.id })
        .lean()
        .populate("gear")

      const gears = await Gear.find({
        user: req.user.id,
        template: true,
      }).lean()

      res.status(200).json({ success: true, blogs: blogs, trips, gears })
    } catch (err) {
      console.log(err)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  getFeed: async (req, res) => {
    try {
      const blogs = await Blog.find()
        .sort({ createdAt: "descending" })
        .lean()
        .populate("user")
      res.status(200).json({ success: true, blogs })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}

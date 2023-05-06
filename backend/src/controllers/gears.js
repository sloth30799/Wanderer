const Gear = require("../models/Gear")

module.exports = {
  getGear: async (req, res) => {
    try {
      const gear = await Gear.findById(req.params.id).populate("user")
      if (!gear) {
        return res
          .status(404)
          .json({ success: false, messages: "Gear not found" })
      }

      return res.status(200).json({ success: true, gear: gear || null })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  getTemplates: async (req, res) => {
    try {
      const userTemplates = await Gear.find({
        user: req.user.id,
        template: true,
      }).lean()

      const templates = await Gear.find({
        createdBy: "Admin",
        template: true,
      }).lean()

      return res
        .status(200)
        .json({ success: true, templates: [...userTemplates, ...templates] })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  createGear: async (req, res) => {
    try {
      const gear = await Gear.create({
        name: req.user.userName,
        user: req.user.id,
        equipments: [],
        accessories: [],
        essentials: [],
        createdBy: req.user.userName,
      })

      if (!gear) {
        res
          .status(404)
          .json({ success: false, data: "Failed to create gear template" })
      }
      req.flash("success", {
        msg: "Success! Your Gear Template has been created.",
      })

      res.status(200).json({ success: true, gear: gear, messages: req.flash() })
    } catch (error) {
      console.error(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  updateGear: async (req, res) => {
    try {
      const updatedGear = req.body

      console.log(updatedGear)
      const gear = await Gear.findOneAndReplace(
        {
          _id: updatedGear._id,
        },
        { ...updatedGear, updatedAt: Date.now() }
      )

      if (!gear) {
        res.status(404).json({ success: false, messages: "Gear not Updated" })
      }

      req.flash("success", {
        msg: "Success! Your Gear List has been updated.",
      })

      res.status(200).json({ success: true, messages: req.flash(), gear })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
  deleteGear: async (req, res) => {
    try {
      // Find gear by id
      const gear = await Gear.findById(req.params.id)

      if (!gear) {
        res.status(404).json({ success: false, messages: "Gear not found" })
      }

      // Delete gear from db
      await Gear.deleteOne({ _id: req.params.id })
      console.log("Deleted Gear")
      res.status(200).json({ success: true, messages: "Deleted Gear" })
    } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, error: "Internal Server Error" })
    }
  },
}

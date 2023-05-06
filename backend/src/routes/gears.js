const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const gearController = require("../controllers/gears")

router.get("/fetchTemplates", ensureAuth, gearController.getTemplates)

router.get("/:id", ensureAuth, gearController.getGear)

router.post("/createGear", ensureAuth, gearController.createGear)

router.put("/updateGear", ensureAuth, gearController.updateGear)

router.delete("/deleteGear/:id", ensureAuth, gearController.deleteGear)

module.exports = router

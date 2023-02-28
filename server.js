const path = require("path")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("express-flash")
const logger = require("morgan")
const connectDB = require("./server/config/database")
const mainRoutes = require("./server/routes/main")
const authRoutes = require("./server/routes/auth")
const postsRoutes = require("./server/routes/posts")
const gearsRoutes = require("./server/routes/gears")
const tripsRoutes = require("./server/routes/trips")
const templatesRoutes = require("./server/routes/templates")

//Use .env file in config folder
require("dotenv").config({ path: "./server/config/.env" })

// Passport config
require("./server/config/passport")(passport)

//Connect To Database
connectDB()

//Static Folder
app.use(express.static("frontend/build"))

//Body Parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logging
app.use(logger("dev"))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for errors, info, ect...
app.use(flash())

//Setup Routes For Which The Server Is Listening
app.use("/api", mainRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postsRoutes)
app.use("/api/trip", tripsRoutes)
app.use("/api/gear", gearsRoutes)
app.use("/api/template", templatesRoutes)

// app.use("*", (_, res) => {
// 	res.sendFile(path.join(__dirname, "frontend/build/index.html"))
// })

const PORT = process.env.PORT || 5000

//Server Running
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}, you better catch it!`)
})

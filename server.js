const path = require("path")
const express = require("express")
const app = express()


app.use(express.static("build"))



const port = process.env.PORT || 3333
app.listen(port, () => console.log("connected:", port))


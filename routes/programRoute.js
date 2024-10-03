const express = require("express")
const programRoute = express.Router()
const {createProgram, getProgram, updateProgram, deleteProgram} = require('../controllers/programController')



programRoute.post("/create/:id", createProgram)
programRoute.get("/get/:id", getProgram)
programRoute.patch("/update/:id", updateProgram)
programRoute.delete("/delete/:id", deleteProgram)


module.exports = programRoute

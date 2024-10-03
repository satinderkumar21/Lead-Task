const express = require("express");
const orgRoute = express.Router();
const  upload = require('../config/multer')
const {
  createOrganization,
  getOrganization,
  updatedOrganization,
  deleteOrganization,
  
} = require("../controllers/organizationController");

orgRoute.post("/create", upload.single("logo"), createOrganization);
orgRoute.get("/get/:id", getOrganization);
orgRoute.patch("/update/:id", updatedOrganization);
orgRoute.delete("/delete/:id", deleteOrganization);

module.exports = orgRoute;

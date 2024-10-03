const express = require("express");
const appRoute = express.Router();
const {
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  uploadImages,
} = require("../controllers/applicationController");

appRoute.post("/create/:id", uploadImages, createApplication);
appRoute.get("/get/:id", getApplication);
appRoute.patch("/update/:id", uploadImages, updateApplication);
appRoute.delete("/delete/:id", deleteApplication);

module.exports = appRoute;

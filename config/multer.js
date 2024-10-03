const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Configure storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "organization_logos",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload
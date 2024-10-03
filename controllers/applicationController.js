const { application, program } = require("../models");

const upload = require("../config/multer");

// Use the 'fields' method for uploading multiple files
const uploadImages = upload.fields([
  { name: "formLogo", maxCount: 1 },
  { name: "formBanner", maxCount: 1 },
]);

const createApplication = async (req, res) => {
  try {
    let uploadLogo = "";
    let uploadBanner = "";

    console.log("Path....", req.files);

    // Check if logo and banner files are uploaded
    if (req.files) {
      uploadLogo = req.files.formLogo[0].path;
    }
    if (req.files) {
      uploadBanner = req.files.formBanner[0].path;
    }
    // program id
    const { id } = req.params;

    const Program = await program.findOne({ where: { id } });

    if (Program) {
      const app = await application.create({
        ...req.body,
        formLogo: uploadLogo,
        formBanner: uploadBanner,
        prgmId: Program.id,
      });
      res.status(200).json({ message: "application created", app });
      //   console.log("logo234", req.files.formoLogo);
    } else {
      throw new Error("program not exist");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const Program = await program.findOne({ where: { id } });

    if (Program) {
      const app = await application.findOne({ where: { formStatus: true } });
      res.status(200).json(app);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    // Check if logo and banner files are uploaded
    console.log("updated..................", req.files);
    let uploadLogo = "";
    let uploadBanner = "";
    let data = req.body
    if (req.files && req.files.formLogo) {
      uploadLogo = req.files.formLogo[0].path;
      data.formLogo = uploadLogo;
    }
    if (req.files && req.files.formBanner) {
      uploadBanner = req.files.formBanner[0].path;
      data.formBanner = uploadBanner;
    }

    const { id } = req.params;
    const app = await application.findOne({ where: { id } });

    if (app) {
      
      const updateApp = await application.update(
         data,
        { where: { id: app.id } }
      );

      res.status(200).json({ message: "application has updated", updateApp });
    } else {
      throw new Error("application fotm not exist");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check delete working
const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await application.findOne({ where: { id } });
    if (app) {
      await application.destroy({ where: { id } });
      res.status(200).json({ message: "application deleted successfully" });
    } else {
      throw new Error("application not exist");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication,
  uploadImages,
};

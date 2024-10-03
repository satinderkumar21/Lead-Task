const { organization } = require("../models");

//create organization
const createOrganization = async (req, res) => {
  try {
    let uploadLogo = "";
    if (req.file) {
      uploadLogo = req.file.path;
    }
    const Organization = await organization.create({
      ...req.body,
      logo: uploadLogo,
    });
    res.status(200).json({ message: "organization created", Organization });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get the organizzation
const getOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const Org = await organization.findOne({ where: { id } });
     if(!Org){
      throw new Error(" organization not found")
     }
    res.status(200).json(Org);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//edit organization
const updatedOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const Org = await organization.findOne({ where: { id } });

    if(Org){
      const updatedOrg = await organization.update(data, {
        where: {
          id,
        },
      });
      return res
        .status(200).json({ message: "organization updated", updatedOrg });
    } else {
      return res.status(404).json({ message: "organization does not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete organization
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const Org = await organization.findOne({ where: { id } });
    if (Org) {
      const deletedOrg = await organization.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: "organization has deleted" });
    } else {
      return res.status(404).json({ message: "organization does not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrganization,
  getOrganization,
  updatedOrganization,
  deleteOrganization,
  
};

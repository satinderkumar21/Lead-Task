const { program, organization } = require("../models");



const createProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const Organization = await organization.findOne({ where: { id } });
    if (Organization) {
      const { programName, programEmail, promotionalEmail } = req.body;
      const Program = await program.create({
        programName,
        programEmail,
        promotionalEmail,
        orgId: Organization.id,
      });
      return res.status(200).json({ message: "program has created", Program });
    } else {
      return res.status(404).json({ message: "organization not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const Organization = await organization.findOne({ where: { id } });

    if (Organization) {
      const Program = await program.findAll();
      res.status(200).json(Program);
    } else {
      res.status(404).json({ message: "organization not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const Program = await program.findOne({ where: { id } });
    if (Program) {
      const data = req.body;
      const updatedProgram = await program.update(data, { where: {id} });
      return res.status(200).json({ message: "program updated", updatedProgram });
    } else {
      res.status(404).json({ message: "program not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    
    const Program  = await program.findOne({where:{id}})
    if(Program){
    await program.destroy({ where: { id } });
    res.status(200).json({ message: "program deleted" });
    } else{
        return res.status(404)({message:"program not found"})
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProgram, getProgram, updateProgram, deleteProgram };

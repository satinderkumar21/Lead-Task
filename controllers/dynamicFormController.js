const {
  section,
  sectionfield,
  fieldoption,
  application,
} = require("../models");

const createDynamicForm = async (req, res) => {
  try {
    // application form id
    const { id } = req.params;
    const app = await application.findOne({ where: { id } });

    if (!app) {
      throw new Error("Application form does not exist");
    }

    
    const { secsdata } = req.body;

    const sectionData = [];
    const sectionFieldsData = [];
    const fieldOptionsData = [];

    // Populate section data
    secsdata.forEach((secdata) => {
      sectionData.push({
        name: secdata.name,
        appId: app.id,
      });
    });

    // Bulk create sections
    const sect = await section.bulkCreate(sectionData, { returning: true });

    if (sect.length > 0) {
      for (const secdata of secsdata) {
        const secId = sect.find((s) => s.name === secdata.name).id; // Find section ID

        // Populate section fields data
        secdata.fields.forEach((field) => {
          if (field) {
            sectionFieldsData.push({
              type: field.type,
              label: field.label,
              pholder: field.pholder,
              ismndtry: field.ismndtry,
              description: field.description,
              secId: secId,
            });
          }
        });
      }

      // Bulk create section fields
      const secfields = await sectionfield.bulkCreate(sectionFieldsData, {
        returning: true,
      });

      if (!secfields){
        throw new Error("Section fields not created");
      }

      // Prepare field options for each section field
      secfields.forEach((secfield) => {
        const fieldType = secfield?.type;

        if (
          ["dropdown", "radio", "checkbox", "multiple choice"].includes(
            fieldType
          )
        ) {
          // Find the corresponding secdata based on the field type
          const currentSecdata = secsdata.find((sec) =>
            sec.fields.some((f) => f.type === fieldType)
          );

          if (currentSecdata) {
            const field = currentSecdata.fields.find(
              (f) => f.type === fieldType
            );

            // Use 'value' instead of 'options'
            const options = field?.value;

            if (options) {
              options.forEach((option) => {
                fieldOptionsData.push({ 
                  value: option,
                  secfldId: secfield.id,
                });
              });
            }
          }
        }
      });

      // Bulk create field options if there are any
      if (fieldOptionsData.length > 0){
        await fieldoption.bulkCreate(fieldOptionsData);
      }

      res.status(200).json({
        message: "Dynamic form created successfully",
        sections: sect,
        sectionFields: secfields,
        fieldOptions: fieldOptionsData,
      });
    } else {
      throw new Error("Sections not created");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDynamicForm = async (req, res) => {
  try {
    // find application by id and
    const { id } = req.params;
    const app = await application.findOne({
      where: { id },
      include: [
        {
          model: section,
          include: [
            {
              model: sectionfield,
              include: [
                {
                  model: fieldoption,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!app) {
      throw new Error("application not found");
    }

    res.status(200).json(app);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const  updateSectionName = async (req, res) =>{
    try {
       // section id
        const {id} = req.params
        const {name} = req.body
        const Section = await section.findOne({
            where:{
               id:id
            }
        })

        if(Section){
           const  updatedSection = await section.update({name}, {
                    
                 where:{
                      id:Section.id
                    }
                })

                res.status(200).json({message:" section update succesfull",updatedSection})
        }else{
            throw new Error("section not exist")
        }
       
        

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


const updateField = async (req, res) => {

try {

//field id
  const {id} = req.params
  const {fields} = req.body


  const field = await sectionfield.findOne({where:{id}})

  if(!field){
    throw new Error("field not exist")
  }


  if(["dropdown","radio","checkbox","multiple choice"].includes(fields.type)){
     

    await sectionfield.destroy({
      where:{
        id:id 
      }
    })


    const Sectionfield =  await sectionfield.create({
      type:fields.type,
      label:fields.label,
      pholder:fields.pholder,
      ismndtry:fields.ismndtry,
      description:fields.description,
      secId:field.secId
    })
    

    if(fields.value){

      
    const optionData = [];

    fields.value.forEach((element)=>{
     
      optionData.push({
        value:element,
        secfldId:Sectionfield.id
      })
  
      
    })

   if(optionData.length>0){
    const optionValue = await fieldoption.bulkCreate(optionData)

    res.status(200).json({message:"updated sucessfull section field and option field", Sectionfield, optionValue})
   }

    }

    

  }else{
    
    const updatedFieldsValue = await sectionfield.update({
      type:fields.type,
      label:fields.label,
      pholder:fields.pholder,
      ismndtry:fields.ismndtry,
      description:fields.description
  
    },{
      where:{
        id:id
      }
    })

    res.status(200).json(updatedFieldsValue)

  }
  
 
  res.status(200).json(updatedFieldsValue)

} catch (error) {
  res.status(500).json({error:error.message})
}

}



const deleteSection = async (req, res) => {

  try {
    //section id
const {id} = req.params

const Section = await section.findOne({
  where:{
    id:id
  }
})

if(Section){

  await section.destroy({
    where:{
      id
    }
  })
 
  res.status(200).json({message:"section delete successfull"})

}else{
  throw new Error("section not exist")
}
  } catch (error) {
    res.status(500).json({error:error.message})
  }


}

//delete field
const deleteSectionField = async (req, res) => {

  try {
    //sectionField id
const {id} = req.params

const SectionField = await sectionfield.findOne({
  where:{
    id:id
  }
})

if(SectionField){

  await sectionfield.destroy({
    where:{
      id
    }
  })
 
  res.status(200).json({message:"sectionField delete successfull"})

}else{
  throw new Error("sectionField not exist")
}
  } catch (error) {
    res.status(500).json({error:error.message})
  }


}


module.exports = {
  createDynamicForm,
  getDynamicForm,
  updateSectionName,
  updateField,
  deleteSection,
  deleteSectionField

};

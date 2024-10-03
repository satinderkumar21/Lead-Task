const express = require('express')
const dynamicFormRoute = express.Router();
const {createDynamicForm, getDynamicForm,updateSectionName, updateField, deleteSection, deleteSectionField } = require('../controllers/dynamicFormController')


// application form id
dynamicFormRoute.post('/create/:id', createDynamicForm);

//application form id
dynamicFormRoute.get('/get/:id', getDynamicForm)

//update section name id: section id
dynamicFormRoute.patch('/updateSection/:id', updateSectionName)

//update field id:field id
dynamicFormRoute.patch('/updateField/:id', updateField)

//delete section id:secton id
dynamicFormRoute.delete('/delete/section/:id', deleteSection)

//delete section id: field id
dynamicFormRoute.delete('/delete/field/:id', deleteSectionField)


module.exports = dynamicFormRoute
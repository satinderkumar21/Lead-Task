const express = require('express')
const app = express()
const orgRoute = require('./routes/organizationRoute')
const program = require('./routes/programRoute')
const appRoute = require('./routes/applicationRoute')
const dynamicForm = require('./routes/dynamicFormRoute')
require('dotenv').config()


app.use(express.json());
app.use((req, res, next)=>{
    console.log(req.method, req.path)
    next()
})


app.use("/api/organization",orgRoute);
app.use("/api/program",program)
app.use("/api/application",appRoute)
app.use("/api/dynamicForm", dynamicForm);


app.listen(process.env.PORT,()=>{
    console.log('server is runnig on the Port', process.env.PORT)
})
const express = require('express')
require('./db/dbConnection')
const authRoute = require('./routes/auth')
const app = express()

app.use(express.json())


app.use("/api/auth",authRoute)

app.listen(3000,()=>{
    console.log("Server is running...");
})


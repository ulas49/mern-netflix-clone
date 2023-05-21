const express = require('express')
require('./db/dbConnection')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const app = express()

app.use(express.json())


app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)

app.listen(3000,()=>{
    console.log("Server is running...");
})


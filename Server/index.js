require("./db/mongoose"); 
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
require('dotenv').config();
const port = 4001;

app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoutes);


const server = app.listen(port,()=>{

console.log(`server running in ${port}`)


});

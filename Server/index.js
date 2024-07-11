const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
require('dotenv').config();
const port = 4000;

app.use(cors());
app.use(express.json());
const mongoUri = "mongodb+srv://gaveen:pass123@cluster0.3mwbfgj.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  });



const server = app.listen(port,()=>{

console.log(`server running in ${port}`)


});
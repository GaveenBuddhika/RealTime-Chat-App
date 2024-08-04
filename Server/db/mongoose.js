const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://gaveen:pass123@cluster0.3mwbfgj.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  });
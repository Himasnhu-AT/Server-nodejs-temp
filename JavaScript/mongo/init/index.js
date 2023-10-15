const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// CORS Config
// default: localhost:5500
const corsOptions = {
  origin: ['http://127.0.0.1:5500'], // Specify your allowed frontend origins as an array
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


// IMPORTS FROM OTHER FILES


// INIT
const PORT = process.env.PORT || 3000;
const app = express();
const DB = `${process.env.MONGODB_HOST}`;


// middleware
app.use(cors(corsOptions));
app.use(express.json());


// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
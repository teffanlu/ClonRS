require("dotenv").config();
const express = require("express");
const config = require("./server/config");
const app = config(express());

// database
require("./config/mongoose");

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

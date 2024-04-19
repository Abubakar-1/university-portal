require("dotenv").config();

const express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const port = 5003;
const db = "mongodb://localhost:27017/University-Portal";
const cors = require("cors");
const { default: helmet } = require("helmet");
const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectionparams = {
  useNewURLParser: true,
  useUnifiedTopology: true,
};

const corsOption = {
  credentials: true,
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//gives your server a layer one protection from ddos

mongoose
  .connect(db, connectionparams)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("error", error);
  });

http.listen(port, () => {
  console.log("Server connected");
});

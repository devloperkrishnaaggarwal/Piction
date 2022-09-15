const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { title } = require("process");
const { query, Router } = require("express");
const app = express();
const port = 3000;
const appName = "Piction";
mongoose.connect("mongodb://localhost/pictionForm");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "dist")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const pictionFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  message: String,
});
const pictionFormData = mongoose.model("pictionFormData", pictionFormSchema);

app.get("/", (req, res) => {
  res.render("home", { title: "Piction" });
});
app.get("/gallery", (req, res) => {
  res.render("gallery", { title: "Piction" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "Piction" });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Piction",
  });
});

app.post("/contact", (req, res) => {
  const pictionForm = new pictionFormData(req.body);
  pictionForm
    .save()
    .then(() => {
      res.send("We will reply you soon");
    })
    .catch(() => {
      res.send("Form is not working");
    });
});

// app.get()

app.listen(process.env.PORT ||port);

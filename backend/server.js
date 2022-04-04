const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

//MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true});

//Routes
const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter);

app.listen(port, () =>{
    console.log("Server is running on port:" + port);
})
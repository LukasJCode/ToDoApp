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

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const noteSchema={
    title: String,
    content: String
}

const Note = mongoose.model("Note", noteSchema);

app.route("/").get(function(req,res){
    Note.find({}, (err, foundItems) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(foundItems);
        }
    })
})
.post(function(req,res){
    const noteTitle = req.body.title;
    const noteBody = req.body.content;

    const note = new Note({
        title: noteTitle,
        content: noteBody
    });

    note.save();
    res.redirect("/");
    console.log("saved!");
});
app.delete(("/:noteID"), function(req,res){
    Note.deleteOne({_id : req.params.noteID}, (err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.redirect("/");
        }
    })
})

app.listen(port, () =>{
    console.log("Server is running on port:" + port);
})
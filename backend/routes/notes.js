const router = require("express").Router();
let Note = require("../models/note.model");

//get all the notes
router.route("/").get(function(req,res){
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
})

//Add a new notes
.post(function(req,res){
    const noteTitle = req.body.title;
    const noteBody = req.body.content;

    const newNote = new Note({
        title: noteTitle,
        content: noteBody
    });

    newNote.save()
        .then(() => res.redirect("/notes"))
        .catch(err => res.status(400).json("Error: " + err));

    //res.redirect("/notes");
});

//Delete note with given id
router.route("/:noteTitle").delete(function(req,res){
    Note.deleteOne({title : req.params.noteTitle})
        .then(() => res.redirect("/notes"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
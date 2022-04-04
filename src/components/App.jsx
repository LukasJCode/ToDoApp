import React, {useState} from 'react';
import Header from "./Header";
import Note from "./Note";
import Footer from './Footer';
import CreateArea from './CreateArea';
import axios from "axios";

function App(){
    const [notes, setNotes] = useState([]);

    axios.get("http://localhost:5000/notes")
        .then(res => {
            setNotes(res.data);
        });
    

    function addNote(note){
        setNotes((prevNotes)=>{
            return [...prevNotes, note]
        });
    }
    function deleteNote(id, title){
        setNotes((prevTasks) => {
            return prevTasks.filter((task, index) => {
                axios.delete("http://localhost:5000/notes/" + title);
              return index !== id;
            });
          });
    }
    return (
        <div>
            <Header></Header>
            <CreateArea onAdd={addNote}/>
            {notes.map((note, index) => <Note 
                key = {index}
                id = {index}
                title = {note.title}
                content = {note.content}
                onDelete={deleteNote}
                />
            )}
            <Footer></Footer>
        </div>
    );
}

export default App;
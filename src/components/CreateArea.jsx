import React, { useState } from 'react';
import axios from "axios";

function CreateArea(props){
    const [note, setNote] = useState({
        title:"",
        content:""
    });

    function handleChange(event){
        const{name, value} = event.target;
        setNote((prevNote)=>{
            return{
                ...prevNote,
                [name]: value
            }
        });
    }

    function submitNote(event){
        props.onAdd(note);
        axios.post("http://localhost:5000/notes", note)
            .then(res => console.log(res.data));
        setNote({title:"", content:""});
        event.preventDefault();
        
    }

    return (
        <div>
          <form className="create-note">
            <input 
                onChange={handleChange}
                name="title"
                placeholder="Title"
                value={note.title}
            />
            <textarea
                onChange={handleChange}
                name="content"
                placeholder="Take a note..."
                rows="3"
                value={note.content}
            />
            <button onClick={submitNote}>Add</button>
          </form>
        </div>
      );
}

export default CreateArea;
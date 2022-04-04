import React, { useState } from 'react';
import axios from "axios";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props){
    const [zoom, setZoom] = useState(false);
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

    function handleClick(){
        setZoom(true);
    }

    return (
        <div>
          <form className="create-note">
          {zoom && <input 
                onChange={handleChange}
                name="title"
                placeholder="Title"
                value={note.title}
            />}
            
            <textarea
                onClick={handleClick}
                onChange={handleChange}
                name="content"
                placeholder="Take a note..."
                rows={zoom? 3 : 1}
                value={note.content}
            />
            <Zoom in={zoom}>
                <Fab onClick={submitNote}>
                    <AddBoxIcon/>
                </Fab>
            </Zoom>
          </form>
        </div>
      );
}

export default CreateArea;
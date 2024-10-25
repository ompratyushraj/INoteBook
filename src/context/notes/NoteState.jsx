import React from "react";
import NoteContext  from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const notesInitial = []
    const [notes, setNotes] = useState([]);

    // Get all note:
    const getNote = async () =>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "auth-Token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
        console.log(json);
    }

    // Add a Note:
    const addNote = async (title, description, tag) =>{
        // TODO : API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "auth-Token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        
        const note = await response.json();
        setNotes(notes.concat(note));
        console.log(note);

        // console.log("Adding a new Note");
        // const note = json;
        // {
        //     "_id": "66d9eabbd6480df685340790",
        //     "user": "66d8725a278ab7ebb35f80ea",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2024-09-05T17:30:35.672Z",
        //     "__v": 0
        // };
    }

    // Delete a Note:
    const deleteNote = async (id) =>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
                "auth-Token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);

        console.log("Deleting the note with id." + id);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
    }

    // Edit a Note:
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-Token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json(); 
    
        let newNotes = JSON.parse(JSON.stringify(notes));
        
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag; 
            break; 
          }
        }  
        console.log("Editing a Note.....");
        console.log(id, newNotes);
        setNotes(newNotes);

        // const updatedNotes = notes.map((note) =>{
        //     note._id === id ? { ...note, title, description, tag } : note
        //    // console.log("fuck, it in a loop");

        // });
        // setNotes(updatedNotes);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;


// const s1 = {
//     "name": "Pratyush Raj Srivastava",
//     "class": "10"
// }
// const [state, setState] = useState(s1);

// const update = ()=>{
//     setTimeout(() => {
//         setState({
//             "name": "Prateev Kamal Srivastava",
//             "class": "12"
//         })
//     }, 3000);
// }
// return (
//     <NoteContext.Provider value={{state: state, update: update}}>
//         {props.children}
//     </NoteContext.Provider>
// )
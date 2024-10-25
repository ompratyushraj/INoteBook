import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="container mx-1 row ">
          <p className="col mx-1 icon" onClick={()=>{updateNote(note)}}>Edit</p>
          <p className="col mx-1 icon" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully !")}} >Delete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteItem



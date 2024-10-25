import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    
    const handleClick = (e) => {
        e.preventDefault(e)
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added Successfully", "success");
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});

    }
  return (
    <>
      <div className="container my-3">
      <h1>Add a note</h1>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" minLength={5} required value={note.title} className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input minLength={5} required value={note.description} type="text" className="form-control" id="description" name="description" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input minLength={5} required value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
        
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
      </form>
    </div>
    </>
  )
}

export default AddNote

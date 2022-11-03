import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContxt";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


const Notes = () => {
  const ref = useRef(null);
 // const refClose=useRef(null);
  let context = useContext(noteContext);
  const navigate=useNavigate();
  const { notes, getAllNotes,editNote } = context;
  const [note,setNote]=useState({id:'',title:'',description:'',tag:''})
  //for launching a modal when user clicks on update icon
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({...currentnote,id:currentnote._id});
    
  };
  const updatehandleClick=(e)=>{
    //console.log("handle click is working")
  // refClose.current.click()--->can simply use bootstrap attribute -->data-bs-dismiss='model
      //console.log(note.id)
      //console.log(note)
      editNote(note.id,note.title,note.description,note.tag)
   
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate('/login')
    };
    
  }, [ ]);
  return (
    <>
      <AddNote />
      <button
      ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-4">
          <input
          placeholder="title"
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            name="title"
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className="mb-4 ">
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={(e) => {
              setNote({ ...note, description: e.target.value });
            }}
            name="description"
            value={note.description}
            placeholder="description"
            minLength={5}
            required
          />
        </div>
        <div className="mb-4">
          <input
           placeholder="tag"
          type="text"
          className="form-control"
          id="tag"
          onChange={(e) => {
            setNote({ ...note, tag: e.target.value });
          }}
          name="tag"
            value={note.tag}

          />
        </div>

       
      </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button   type="button" data-bs-dismiss='modal' className="btn btn-primary" onClick={updatehandleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id}  updateNote={updateNote} note={note} />
          
        })}
      </div>
    </>
  );
};

export default Notes;

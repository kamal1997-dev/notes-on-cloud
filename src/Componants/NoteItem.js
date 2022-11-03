import React, { useContext } from "react";
import noteContext from "../context/notes/noteContxt";


const NoteItem = (props) => {
  const{note,updateNote}=props;
  const context=useContext(noteContext);
  const {delNote}=context;
  return (
    <React.Fragment  >
    <div className="col-md-4 my-3">
      <div className="card bg-light" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <hr></hr>
          <p className="card-text">{note.description}</p>
          <hr></hr>
          <p className="card-text">Tag:{note.tag}</p>
          <hr></hr>

          <div>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{delNote(note._id)}} ></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default NoteItem;

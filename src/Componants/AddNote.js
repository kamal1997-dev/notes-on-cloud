import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContxt";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    
    addNote(note);
    setNote({ title: "", description: "", tag: "" })
  };

  return (
    <div className="container my-3">
      <h2>Add a note</h2>
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

        <button type="submit" className="btn btn-primary"  disabled={note.title.length<5 &&note.description.length<5?true:false}onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;

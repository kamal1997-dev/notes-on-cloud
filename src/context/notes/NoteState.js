import { useState } from "react";
import noteContext from "./noteContxt";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const getAllNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();

    setNotes(json);
  };

  //add a note
  const addNote = async (note) => {
    //const receivednote = note;
    const { title, description, tag } = note;
    //api call  for adding note
    const url = `${host}/api/notes/createNotes`;
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
  const note1=await response.json()
    setNotes(notes.concat(note1));
  };

  //delete a note
  const delNote = async (Id) => {
    //api call for deleting a note
    const url = `${host}/api/notes/deleteNote/${Id}`;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },
    });
    const json = await response.json();
    //console.log(json);
    const filteredNote = notes.filter((note) => {
      return note._id !== Id;
    });
    setNotes(filteredNote);
  };

  //edit a note
  const editNote = async (Id, title, description, tag) => {
    //api call
    const url = `${host}/api/notes/updateNote/${Id}`;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //console.log(json);

    //logic to edit on client side
    let newNotes=JSON.parse(JSON.stringify(notes))
    for(let i=0;i<newNotes.length;i++){
      let element=newNotes[i];
      if(element._id===Id){
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
        break;

      }
    }
    

    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, delNote, editNote, getAllNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

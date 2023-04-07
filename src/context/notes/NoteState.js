import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  // const notesInitial = []
  const [notes, setNotes] = useState([])

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTQ0ZjY5ZDIyZmM4ZTViYjM5OGY0In0sImlhdCI6MTY4MDQyNjI2MH0.qv7sdrhPriEOZ1-Urd2wy-bruIfszF2y9o_o30snj6Q"
      }
    });
    const json = await response.json()
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tags) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTQ0ZjY5ZDIyZmM4ZTViYjM5OGY0In0sImlhdCI6MTY4MDQyNjI2MH0.qv7sdrhPriEOZ1-Urd2wy-bruIfszF2y9o_o30snj6Q"
      },
      body: JSON.stringify({ title, description, tags })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTQ0ZjY5ZDIyZmM4ZTViYjM5OGY0In0sImlhdCI6MTY4MDQyNjI2MH0.qv7sdrhPriEOZ1-Urd2wy-bruIfszF2y9o_o30snj6Q"
      }
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tags) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyOTQ0ZjY5ZDIyZmM4ZTViYjM5OGY0In0sImlhdCI6MTY4MDQyNjI2MH0.qv7sdrhPriEOZ1-Urd2wy-bruIfszF2y9o_o30snj6Q"
      },
      body: JSON.stringify({ title, description, tags })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tags = tags;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;
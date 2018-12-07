import React, { Component } from "react";
import { timingSafeEqual } from "crypto";
import { runInThisContext } from "vm";

class App extends Component {
  state = {
    notes: []
  };

  onSubmit = event => {
    event.preventDefault(); // prevent page reload
    // add a new note
    var note = {
      id: Math.floor(Math.random() * 1001), // random number from 0 to 1000
      title: this.refs.titleContent.value,
      body: this.refs.bodyContent.value,
      editMode: false
    };

    this.refs.titleContent.value = "";
    this.refs.bodyContent.value = "";

    this.state.notes.push(note); // adding a note to the array

    this.setState({
      // trigger the re-render of note components
      notes: this.state.notes
    });
  };

  deleteNote = id => {
    let filteredNotes = this.state.notes.filter(note => {
      return note.id !== id;
    });

    this.setState({
      // triggering the re-rendering of UI
      notes: filteredNotes
    });
  };

  getNote(id) {
    // Helper function
    return this.state.notes.find(note => note.id === id);
  }

  editNote = id => {
    let matchingNote = this.getNote(id);

    matchingNote.editMode = !matchingNote.editMode; // true or false

    this.setState({
      notes: this.state.notes
    });
  };

  onTitleChange = (id, newValue) => {
    let matchingNote = this.getNote(id);
    matchingNote.title = newValue;
    this.setState({
      notes: this.state.notes
    });
  };

  onBodyChange = (id, newValue) => {
    let matchingNote = this.getNote(id);
    matchingNote.body = newValue;
    this.setState({
      notes: this.state.notes
    });
  };

  render() {
    return (
      <div>
        <div className="div-board">
          <div className="row">
            {/* iterate through the notes array and return all Note objects for each array item  */}
            {this.state.notes.map(note => {
              return (
                <Note
                  key={note.id}
                  title={note.title}
                  body={note.body}
                  editMode={note.editMode}
                  onDelete={() => {
                    this.deleteNote(note.id);
                  }}
                  onEdit={() => {
                    this.editNote(note.id);
                  }}
                  onTitleChange={event => {
                    let newValue = event.target.value;
                    this.onTitleChange(note.id, newValue);
                  }}
                  onBodyChange={event => {
                    let newValue = event.target.value;
                    this.onBodyChange(note.id, newValue);
                  }}
                />
              ); //
            })}
          </div>
        </div>
        <div>
          <h3>Create a Note</h3>
          <label>Title:</label>
          <form onSubmit={this.onSubmit}>
            <input ref="titleContent" type="text" required />
            <br />
            <label>Body:</label>
            <textarea ref="bodyContent" rows="5" required />
            <br />
            <button type="submit" className="btn btn-success add-button">
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function Note({
  title,
  body,
  editMode,
  onDelete,
  onEdit,
  onTitleChange,
  onBodyChange
}) {
  if (editMode === false) {
    return (
      <div className="col-sm-6">
        <div className="card card-view">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p>{body}</p>
            <button onClick={onEdit} className="btn btn-info">
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-sm-6">
        <div className="card card-view">
          <div className="card-body">
            {/* <h5 className="card-title">{title}</h5> */}
            <input onChange={onTitleChange} value={title} />
            <textarea onChange={onBodyChange} value={body} rows={5} />
            <button onClick={onEdit} className="btn btn-success">
              Save
            </button>
            <button onClick={onEdit} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

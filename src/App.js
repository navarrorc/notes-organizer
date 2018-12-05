import React, { Component } from "react";

class App extends Component {
  state = {
    notes: [],
    editMode: false
  };

  onClick = () => {
    // add a new note
    var note = {
      id: Math.floor(Math.random() * 1001), // random number from 0 to 1000
      title: this.refs.titleContent.value,
      body: this.refs.bodyContent.value
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
    let newNoteArr = this.state.notes;
    newNoteArr.forEach((note, index) => {
      // TODO: revisit and find a better way to delete the note from the notes array
      if (id === note.id) {
        newNoteArr.splice(index, 1);
      }
    });
    this.setState({
      // triggering the re-rendering of UI
      notes: newNoteArr
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
                  editMode={this.state.editMode}
                  onDelete={() => {
                    this.deleteNote(note.id);
                  }}
                />
              ); //
            })}
          </div>
        </div>
        <div>
          <h3>Create a Note</h3>
          <label>Title:</label>
          <form>
            <input ref="titleContent" type="text" required />
            <br />
            <label>Body:</label>
            <textarea ref="bodyContent" rows="5" required />
            <br />
            <button
              onClick={this.onClick}
              className="btn btn-success add-button"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function Note({ title, body, editMode, onDelete }) {
  if (editMode === false) {
    return (
      <div className="col-sm-6">
        <div className="card card-view">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p>{body}</p>
            <button className="btn btn-info">Edit</button>
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
            <input defaultValue={title} />
            <textarea defaultValue={body} rows={5} />
            <button className="btn btn-info">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

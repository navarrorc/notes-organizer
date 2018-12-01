import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <div className="div-board">
          <div className="row">
            <Note
              title="Class Notes"
              body="Use constructors when extending another class and needing to define new class properties"
            />
          </div>
        </div>
        <div>
          <h3>Create a Note</h3>
          <label>Title:</label>
          <input type="text" />
          <br />
          <label>Body:</label>
          <textarea rows="5" />
          <br />
          <button className="btn btn-success add-button">Add</button>
        </div>
      </div>
    );
  }
}

function Note({ title, body }) {
  return (
    <div className="col-sm-6">
      <div className="card card-view">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p>{body}</p>
          <button className="btn btn-info">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default App;

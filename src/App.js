import "./App.css";

import React, { Component } from "react";
import CustomModal from "./Components/CustomModal/CustomModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
      taskList: [],
    };
  }

  toggle = () => {
    //add this after modal creation
    this.setState({ modal: !this.state.modal }); //add this after modal creation
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <div>
        <main>
          <h1 className="text-black text-uppercase text-center my-4">
            Task Manager
          </h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="">
                  <button className="btn btn-primary" onClick={this.createItem}>
                    Add task
                  </button>
                </div>

                <ul className="list-group list-group-flush"></ul>
              </div>
            </div>
          </div>

          {this.state.modal ? (
            <CustomModal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            ></CustomModal>
          ) : null}
        </main>
      </div>
    );
  }
}

export default App;

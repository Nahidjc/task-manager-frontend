import "./App.css";

import React, { Component } from "react";
import CustomModal from "./Components/CustomModal/CustomModal";
import Axios from "axios";
import { headers } from "./Components/Shared/Shared";

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

  handleSubmit = (item) => {
    this.toggle();
    console.log(item);
    if (item.id) {
      // if old post to edit and submit
      Axios({
        url: `http://localhost:8000/api/tasks/${item.id}/`,
        method: "PUT",
        headers: headers,
        data: item,
      }).then((res) => console.log(res));
      return;
    }
    // if new post to submit

    Axios({
      url: "http://127.0.0.1:8000/api/tasks/",
      method: "POST",
      headers: headers,
      data: item,
    }).then((res) => console.log(res));
  };

  componentDidMount() {
    console.log("get data");
    this.refreshList();
  }

  refreshList = () => {
    Axios({
      url: "http://127.0.0.1:8000/api/tasks/",
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        this.setState({ taskList: res.data });
      })
      .catch((err) => console.log(err));
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
    );
    console.log(newItems);
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
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

                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
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

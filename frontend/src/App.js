  // import Component from the react module
  import React, { Component } from "react";
  import Modal from "./components/Modal";
  import axios from 'axios';

  // create a class that extends the component
  class App extends Component {

    // add a constructor to take props
    constructor(props) {
      super(props);
      
      // add the props here
      this.state = {
      
      // the viewCompleted prop represents the status
      // of the task. Set it to false by default
      viewCompleted: 0,
      activeItem: {
        title: "",
        date: "",
        status: 0
      },
      
      // this list stores all the status tasks
      taskList: []
      };
    }

    // Add componentDidMount()
    componentDidMount() {
      console.log("refreshList is being called.")
      this.refreshList();
    }

    refreshList = () => {
      axios //Axios to send and receive HTTP requests
      .get("http://localhost:8000/todo/api/tasks/")
      .then(res => {this.setState({ taskList: res.data }); console.log(this.state)})
      .catch(err => console.log(err));
    };

    // this arrow function takes status as a parameter
    // and changes the status of viewCompleted to true
    // if the status is true, else changes it to false
    displayCompleted = status => {
      if (status) {
      return this.setState({ viewCompleted: 1 });
      }
      return this.setState({ viewCompleted: 0 });
    };

  // this array function renders two spans that help control
  // the set of items to be displayed(ie, completed or incomplete)
  renderTabList = () => {
    return (
    <div className="my-5 tab-list">
      <span
      onClick={() => this.displayCompleted(true)}
      className={this.state.viewCompleted > 0 ? "active" : ""}
      >
      Completed
        </span>
      <span
      onClick={() => this.displayCompleted(false)}
      className={this.state.viewCompleted > 0 ? "" : "active"}
      >
      Incompleted
        </span>
    </div>
    );
  };
  // Main variable to render items on the screen
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
    (item) => item.status === viewCompleted
    );
    console.log(this.state.taskList);
    return newItems.map((item) => (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      <span
      className={`todo-title mr-2 ${
        this.state.viewCompleted > 0 ? "status-todo" : ""
      }`}
      title={item.title}
      >
      {item.title}<br/>
      {item.date} 
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

  toggle = () => {
    //add this after modal creation
    this.setState({ modal: !this.state.modal });
  };


  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    alert("save" + JSON.stringify(item));
    if (item.id) {
    // if old post to edit and submit
    axios
      .put(`http://localhost:8000/todo/api/tasks/${item.id}/`, item)
      .then((res) => this.refreshList());
    return;
    }
    // if new post to submit
    axios
    .post("http://localhost:8000/todo/api/tasks/", item)
    .then((res) => this.refreshList());
  };

  // Delete item
  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios
    .delete(`http://localhost:8000/todo/api/tasks/${item.id}/`)
    .then((res) => this.refreshList());
  };

  // Create item
  createItem = () => {
    const item = { title: "", date: "2023-04-14T18:16:52.128605-04:00", status: 0 };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Start by visual effects to viewer
  render() {
    return (
    <main className="content">
      <h1 className="text-success text-uppercase text-center my-4">
      GFG Task Manager
      </h1>
      <div className="row ">
      <div className="col-md-6 col-sm-10 mx-auto p-0">
        <div className="card p-3">
        <div className="">
          <button onClick={this.createItem} className="btn btn-info">
          Add task
          </button>
        </div>
        {this.renderTabList()}
        <ul className="list-group list-group-flush">
          {this.renderItems()}
        </ul>
        </div>
      </div>
      </div>
      {this.state.modal ? (
      <Modal
        activeItem={this.state.activeItem}
        toggle={this.toggle}
        onSave={this.handleSubmit}
      />
      ) : null}
    </main>
    );
  }
  }
  export default App;

import React, { Component } from "react";
import Calender from "./fullcalender";
import Header from "./Header";
import NotificationRender from "./NotificationRender";

import "../styles/Home.css";

export class Home extends Component {
  static displayName = Home.name;

  state = {
    Data: [],
  };

  work = () => {
    this.props.apiservice.get_event().then((result) => {
      console.log(result.data);
      this.setState({ Data: result.data });
    });
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.setAttribute("src", "https://kit.fontawesome.com/5f59ca6ad3.js");

    let todoItemsContainer = document.getElementById("todoItemsContainer");
    let addTodoButton = document.getElementById("addTodoButton");
    let saveTodoButton = document.getElementById("saveTodoButton");

    function getTodoListFromLocalStorage() {
      let stringifiedTodoList = localStorage.getItem("todoList");
      let parsedTodoList = JSON.parse(stringifiedTodoList);
      if (parsedTodoList === null) {
        return [];
      } else {
        return parsedTodoList;
      }
    }

    let todoList = getTodoListFromLocalStorage();
    let todosCount = todoList.length;

    saveTodoButton.onclick = function () {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    function onAddTodo() {
      let userInputElement = document.getElementById("todoUserInput");
      let userInputValue = userInputElement.value;

      if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
      }

      todosCount = todosCount + 1;

      let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false,
      };
      todoList.push(newTodo);
      createAndAppendTodo(newTodo);
      userInputElement.value = "";
    }

    addTodoButton.onclick = function () {
      onAddTodo();
    };

    function onTodoStatusChange(checkboxId, labelId, todoId) {
      let checkboxElement = document.getElementById(checkboxId);
      let labelElement = document.getElementById(labelId);
      labelElement.classList.toggle("checked");

      let todoObjectIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
          return true;
        } else {
          return false;
        }
      });

      let todoObject = todoList[todoObjectIndex];

      if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
      } else {
        todoObject.isChecked = true;
      }
    }

    function onDeleteTodo(todoId) {
      let todoElement = document.getElementById(todoId);
      todoItemsContainer.removeChild(todoElement);

      let deleteElementIndex = todoList.findIndex(function (eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
          return true;
        } else {
          return false;
        }
      });

      todoList.splice(deleteElementIndex, 1);
    }

    function createAndAppendTodo(todo) {
      let todoId = "todo" + todo.uniqueNo;
      let checkboxId = "checkbox" + todo.uniqueNo;
      let labelId = "label" + todo.uniqueNo;

      let todoElement = document.createElement("li");
      todoElement.classList.add("todo-item-container", "flexy");
      todoElement.id = todoId;
      todoItemsContainer.appendChild(todoElement);

      let inputElement = document.createElement("input");
      inputElement.type = "checkbox";
      inputElement.id = checkboxId;
      inputElement.checked = todo.isChecked;

      inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
      };

      inputElement.classList.add("checkbox-input");
      todoElement.appendChild(inputElement);

      let labelContainer = document.createElement("div");
      labelContainer.classList.add("label-container", "flexy");
      todoElement.appendChild(labelContainer);

      let labelElement = document.createElement("label");
      labelElement.setAttribute("for", checkboxId);
      labelElement.id = labelId;
      labelElement.classList.add("checkbox-label");
      labelElement.textContent = todo.text;
      if (todo.isChecked === true) {
        labelElement.classList.add("checked");
      }
      labelContainer.appendChild(labelElement);

      let deleteIconContainer = document.createElement("div");
      deleteIconContainer.classList.add("delete-icon-container");
      labelContainer.appendChild(deleteIconContainer);

      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

      deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
      };

      deleteIconContainer.appendChild(deleteIcon);
    }

    for (let todo of todoList) {
      createAndAppendTodo(todo);
    }

    document.body.appendChild(script);

      this.work()
  }

  render() {
    const { Data } = this.state;
    return (
      <div>
        <Header />
        <div class="home-container">
          <div className="greeting">
            <h1 className="welcome">
              Welcome {this.props.username}! Plan your upcoming trip!
            </h1>
            <div className="to-do-list">
              <h1 className="sub-headings">Add Places you plan to visit</h1>
              <div>
                <input
                  type="text"
                  id="todoUserInput"
                  className="todo-user-input"
                  placeholder="Enter your favorite places"
                />
              </div>

              <button className="buttony" id="addTodoButton">
                Add
              </button>
              <h1 className="sub-headings">My Bucket List</h1>
              <ul className="todo-items-container" id="todoItemsContainer"></ul>
              <button className="buttony" id="saveTodoButton">
                Save
              </button>
            </div>
          </div>
          <div className="calender">
            <Calender {...this.props} />
            <div className="notifications">
              <h1>Notifications</h1>
              <div className="notification-container">
                {Data.map((item) => (
                  <NotificationRender Data={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

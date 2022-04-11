import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

function ListTodos() {
  const [todos, setTodos] = useState([]);

  async function func() {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  async function deleteTodo(id) {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      console.log(deleteTodo);
      func();
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    func();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5">List of Todos</h1>
      <br></br>
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo["todo_id"]}>
                  <td>{todo["todo_id"]}</td>
                  <td>{todo["description"]}</td>
                  <td>
                    <EditTodo todo={todo} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteTodo(todo["todo_id"]);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default ListTodos;

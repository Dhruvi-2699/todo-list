/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todoList"));
    if (todoString) {
      let todoListItem = JSON.parse(localStorage.getItem("todoList"));
      setTodoList(todoListItem);
    }
  }, []);
  const saveToLocalStorage = (params) => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  const handleAdd = () => {
    setTodoList([...todoList, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage();
  };
  const handleEdit = (id) => {
    let todoEdit = todoList.find((item) => item.id == id);
    setTodo(todoEdit.todo);
    let newTodos = todoList.filter((item) => item.id !== id);
    setTodoList(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todoList.filter((item) => item.id !== id);
    setTodoList(newTodos);
    saveToLocalStorage();
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let todoIndex = todoList.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todoList];
    newTodos[todoIndex].isCompleted = !newTodos[todoIndex].isCompleted;
    setTodoList(newTodos);
  };
  console.log("check-", todoList);

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-xl p-5 bg-blue-100 my-5">
        <h1 className="text-xl font-bold text-center">
          MyTodo - Manage your todos here
        </h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold"> Add a todo</h2>
          <input
            name={todo.id}
            onChange={handleChange}
            value={todo}
            className="bg-white w-1/2"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 p-3 py-1 text-white rounded-md m-6"
          >
            Save
          </button>
          <div>
            <input type="checkbox" />
            <span>show done</span>
          </div>
        </div>
        <div className="todos">
          {todoList.length === 0 && (
            <div className="m-5">No todos to display</div>
          )}
          {todoList.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex justify-between items-center"
              >
                <input
                  name={item.id}
                  value={item.isCompleted}
                  type="checkbox"
                  onChange={handleCheckBox}
                  className="mr-2"
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 p-3 py-1 text-white rounded-md m-6"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 p-3 py-1 text-white rounded-md m-6"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

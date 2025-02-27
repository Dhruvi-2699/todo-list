/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

import { TodoComponent } from "./components/TodoComponent";
import { ButtonComponent } from "./components/ButtonComponent";
import { Checkbox } from "./components/Checkbox";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [showDone, setShowDone] = useState(true);

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todoList"));
    if (todoString) {
      let todoListItem = JSON.parse(localStorage.getItem("todoList"));
      setTodoList(todoListItem);
    }
  }, []);
  const saveToLocalStorage = () => {
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
  const toggleFinished = () => {
    setShowDone(!showDone);
  };
  console.log("check-", todoList);

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-xl p-5 bg-yellow-100 m-5 md:w-1/2">
        <h1 className="text-xl font-bold text-center">
          MyTodo - Manage your todos
        </h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold"> Add a todo</h2>
          <div className="flex items-center">
            <input
              name={todo.id}
              onChange={handleChange}
              value={todo}
              className="bg-white rounded-2xl h-7 flex-1 text-sm px-2"
              type="text"
            />
            <ButtonComponent
              text={"Save"}
              handleAction={handleAdd}
              isDisable={todo.length <= 3}
            />
          </div>
          <div className="flex items-center my-2">
            <Checkbox toggleAction={toggleFinished} value={showDone} />
            <span className="text-sm">Show Done</span>
          </div>
          <hr className="border-gray-400 opacity-40" />
        </div>
        <div className="todos my-4">
          <h2 className="text-lg font-bold"> Your Todos</h2>
          {todoList.length === 0 && (
            <div className="m-5">No todos to display</div>
          )}
          {todoList.map((item) => {
            return (
              (showDone || !item.isCompleted) && (
                <TodoComponent
                  item={item}
                  handleCheckBox={handleCheckBox}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

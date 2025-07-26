import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Task from "./Task";

const App = () => {
  const [toDo, setToDo] = useState("");
  const [taskList, setTaskList] = useState([]);

  // Load Task from Local Storage on Component Mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(savedTasks);
  }, []);
  // Handle Add Task
  const handleAddTask = (event) => {
    // Prevent the page from reloading by default form submittion refreshes page.
    event.preventDefault();
    const updatedTasks = [...taskList, toDo.trim()];
    setTaskList(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
    setToDo("");
  };

  const handleDelete = (taskToDelete) => {
    const filteredTask = taskList.filter((task) => task !== taskToDelete);
    setTaskList(filteredTask);
    localStorage.setItem("taskList", JSON.stringify(filteredTask));
  };
  return (
    <div>
      <h1>My App</h1>
      <form onSubmit={handleAddTask}>
        <label htmlFor='toDo'>What to do?</label>
        <input
          type='text'
          name='toDo'
          maxLength='32'
          value={toDo}
          onChange={(event) => setToDo(event.target.value)}
        />
        <input type='submit' value='Add Task' />
      </form>
      <h2>My Task list</h2>
      <table>
        <tbody>
          {taskList.map((task, index) => (
            <Task task={task} key={index} onDone={() => handleDelete(task)} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

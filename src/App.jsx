import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Task from "./Task";
import "./style.css";
import PlusIcon from "./Plus-Icon";

import Relic from "./Relic";

const App = () => {
  const [toDo, setToDo] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [taskFilter, setTaskFilter] = useState("all");

  // Load Task from Local Storage on Component Mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("taskList")) || [];
    setTaskList(savedTasks);
    const savedFilteredTasks =
      JSON.parse(localStorage.getItem("filterStatus")) || [];
    setTaskFilter(savedFilteredTasks);
  }, []);
  // Handle Add Task
  const handleAddTask = (event) => {
    // Prevent the page from reloading by default form submittion refreshes page.
    event.preventDefault();

    // Prevent submissions of empty whitespace
    if (toDo.trim() === "") {
      return;
    }

    // Prevent too much tasks added
    if (taskList.length >= 15) {
      return;
    }
    // Declare a new task object
    const newTask = { name: toDo.trim(), status: false };

    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    localStorage.setItem("taskList", JSON.stringify(updatedTasks));
    setToDo("");
  };

  const handleDelete = (taskToDelete) => {
    const filteredTask = taskList.filter((task) => task !== taskToDelete);
    setTaskList(filteredTask);
    localStorage.setItem("taskList", JSON.stringify(filteredTask));
  };

  const handleTick = (taskToTick) => {
    const currentTaskList = JSON.parse(localStorage.getItem("taskList"));
    const updatedTaskList = currentTaskList.map((task) =>
      task.name === taskToTick.name ? { ...task, status: true } : task
    );
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
    console.log("tick pressed");
  };
  const handleFilter = (event) => {
    setTaskFilter(event.target.value);
    localStorage.setItem("filterStatus", JSON.stringify(event.target.value));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <div className='to-add-list'>
          <input
            type='text'
            name='toAddList'
            minLength='3'
            maxLength='32'
            value={toDo}
            onChange={(event) => setToDo(event.target.value)}
          />
          <button type='submit' className='plus'>
            <PlusIcon />
          </button>

          <select
            name='task'
            id='tasks'
            value={taskFilter}
            onChange={handleFilter}
          >
            <option value='all'>All</option>
            <option value='complete'>Complete</option>
            <option value='incomplete'>Incomplete</option>
          </select>
        </div>
      </form>

      <table>
        <tbody>
          {taskFilter === "all" &&
            taskList.map((task, index) => (
              <Task
                task={task}
                key={index}
                onTick={() => handleTick(task)}
                onDone={() => handleDelete(task)}
              />
            ))}
          {taskFilter === "complete" &&
            taskList
              .filter((task) => task.status === true)
              .map((task, index) => (
                <Task
                  task={task}
                  key={index}
                  onTick={() => handleTick(task)}
                  onDone={() => handleDelete(task)}
                />
              ))}
          {taskFilter === "incomplete" &&
            taskList
              .filter((task) => task.status === false)
              .map((task, index) => (
                <Task
                  task={task}
                  key={index}
                  onTick={() => handleTick(task)}
                  onDone={() => handleDelete(task)}
                />
              ))}
        </tbody>
      </table>
      <hr />
      <h1>Battle Relic Tasks</h1>
      <Relic />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

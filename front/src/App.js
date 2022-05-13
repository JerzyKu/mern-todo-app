import './App.css';

import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    getTasks()
  },[])

  const createTask = () => {
    Axios.post('http://localhost:3001/tasks', {task: newTask}).then( response => {
      getTasks()
      setNewTask("")
    })
  }

  const getTasks = () => {
    Axios.get('http://localhost:3001/tasks').then( response => {
      setTasks(response.data)
    })
  }

  const delTask = (id) => {
    Axios.delete(`http://localhost:3001/tasks/${id}`).then( response => {
      getTasks()
    })
  }

  return (
    <div className="App">
      <input name='task' placeholder='Add task' value={newTask} onChange={(e) => {setNewTask(e.target.value)}}/>
      <button onClick={createTask}>Create task</button>
      { tasks.map( ele => { 
        return (
          <div>
            task name: {ele.task} ;
            id: {ele._id}
            <button onClick={() => {delTask(ele._id)}}>X</button>
          </div>)
        }) 
      }
    </div>
  );
}

export default App;

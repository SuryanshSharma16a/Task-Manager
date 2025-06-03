import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTasks from './components/FilterTasks';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <FilterTasks currentFilter={filter} onFilterChange={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Sort: show incomplete first, completed last
  const sortTasks = (list) => {
    // compare function for sorting
    return [...list].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      // shorthand if-else ? returnIfTrue : returnIfFalse
      return a.completed ? 1 : -1;
    });
  };

  // Fetch tasks from API
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/tasks');
    setTasks(sortTasks(res.data));
  };

  // Add new task
  const addTask = async () => {
    if (!title) return;
    await axios.post('http://localhost:3000/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetchTasks();
  };

  // Toggle task complete/incomplete
  const toggleComplete = async (task) => {
    await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // Enter edit mode
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  // Save edited task
  const saveEdit = async () => {
    if (!editingId) return;
    const newTitle = editingTitle.trim();
    if (!newTitle) return;

    await axios.patch(`http://localhost:3000/tasks/${editingId}`, {
      title: newTitle,
    });

    setEditingId(null);
    setEditingTitle('');
    fetchTasks();
  };

  // Load tasks when app starts
  useEffect(() => {
    fetchTasks();
  }, []);

  // UI rendering
  return (
    <div className='todoList'>
      <h1>Taskify</h1>

      {/* Add task input */}
      <div className='inputWrapper'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className='inputTask'
        />
        <button className='btnAdd' onClick={addTask}>+</button>
      </div>

      {/* Task list */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingId === task.id ? (
              // Edit mode
              <>
                <input
                  type="checkbox"
                  className='taskCheckbox'
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                  className='taskField'
                />
                <div className='actions'>
                  <button className='btnSave' onClick={saveEdit}>Save</button>
                  <button className='btnCancel' onClick={cancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              // Normal view mode
              <>
                <input
                  type="checkbox"
                  className='taskCheckbox'
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <span
                  className={`taskField ${task.completed ? 'finishedTask' : ''}`}
                >
                  {task.title}
                </span>
                <div className='actions'>
                  <button className='btnEdit' onClick={() => startEdit(task)}>✎</button>
                  <button className='btnDelete' onClick={() => deleteTask(task.id)}>🗑</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

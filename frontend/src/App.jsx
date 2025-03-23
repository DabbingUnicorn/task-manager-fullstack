// src/App.jsx
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const API = 'https://task-manager-api-oi9w.onrender.com'; // or your deployed backend

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tasks:', err);
        setLoading(false);
      });
  }, []);

  const addTask = async () => {
    try {
      const res = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter(t => t._id !== id));
  };

  const toggleComplete = async (task) => {
    const res = await fetch(`${API}/tasks/${task._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updated = await res.json();
    setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <span>🧠</span> Task Manager
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new task"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-400">No tasks yet. Add one above! 🎯</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map(task => (
              <li
                key={task._id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-xl"
                  onClick={() => deleteTask(task._id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

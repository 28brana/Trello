import { useState } from 'react';

export function AddTask({ columnId, onAddTask }) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(columnId, title.trim());
    setTitle('');
    setIsAdding(false);
  };

  return isAdding ? (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        placeholder="Enter task title"
        className="input text-sm"
      />
      <div className="mt-2 flex gap-2">
        <button type="submit" className="text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded text-white">
          Add Task
        </button>
        <button type="button" onClick={() => setIsAdding(false)} className="text-sm text-neutral-400 hover:bg-neutral-500 hover:text-white px-2 py-1 rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button
      onClick={() => setIsAdding(true)}
      className="mt-2 text-left text-sm text-neutral-400 hover:bg-neutral-600 transition-all  p-1 px-2 rounded-lg"
    >
      + Add a task
    </button>
  );
}

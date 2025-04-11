import { useState } from 'react';

export function AddTask({ columnId, onAddTask }) {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    console.log('wddd')
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(columnId, title.trim());
    setTitle('');
    setIsAdding(false);
  };

  return isAdding ? (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        placeholder="Enter task title"
        className="w-full rounded bg-neutral-700 px-2 py-1 text-sm text-white placeholder:text-neutral-400"
      />
      <div className="mt-1 flex gap-2">
        <button type="submit" className="text-xs bg-blue-500 px-2 py-1 rounded text-white">
          Add
        </button>
        <button type="button" onClick={() => setIsAdding(false)} className="text-xs text-neutral-400">
          Cancel
        </button>
      </div>
    </form>
  ) : (
    <button
      onClick={() => setIsAdding(true)}
      className="mt-2 text-left text-sm text-neutral-400 hover:text-white"
    >
      + Add a task
    </button>
  );
}

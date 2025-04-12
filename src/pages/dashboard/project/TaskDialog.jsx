import { useState } from 'react';

export function TaskDialog({ task, onClose, onUpdate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.slice(0, 10) : '');

  const handleSave = () => {
    onUpdate(task.id, { title, description, assignedTo, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-neutral-800 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">Edit Task</h2>

        <label className="text-sm text-neutral-400">Title</label>
        <input
          value={title}
          data-cy='title'
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full rounded bg-neutral-700 px-3 py-2 text-sm text-white focus:outline-none"
        />

        <label className="text-sm text-neutral-400">Description</label>
        <textarea
          value={description}
          data-cy='description'
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mb-3 w-full rounded bg-neutral-700 px-3 py-2 text-sm text-white focus:outline-none"
        />

        <label className="text-sm text-neutral-400">Assign to</label>
        <select
          value={assignedTo}
          data-cy='assignedTo'
          onChange={(e) => setAssignedTo(e.target.value)}
          className="mb-3 w-full rounded bg-neutral-700 px-3 py-2 text-sm text-white"
        >
          <option value="">Unassigned</option>
          <option value="bharat">Bharat</option>
          <option value="john">John</option>
          <option value="emma">Emma</option>
        </select>

        <label className="text-sm text-neutral-400">Due Date</label>
        <input
          type="date"
          data-cy='date'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mb-4 w-full rounded bg-neutral-700 px-3 py-2 text-sm text-white focus:outline-none"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded px-4 py-2 text-sm text-neutral-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            data-cy='update-submit-button'
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { TaskDialog } from './TaskDialog';

export function TaskCard({ task, blur = false, onUpdate }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const [open, setOpen] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        onClick={() => setOpen(true)}
        className={`cursor-pointer rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out
        ${blur
          ? 'bg-neutral-600 opacity-60 scale-[0.97] ring-1 ring-neutral-500'
          : 'bg-neutral-700'}
      `}
      >
        <h3 className="font-medium text-neutral-100">{task.title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      </div>

      {open && (
        <TaskDialog
          task={task}
          onClose={() => setOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}

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

  // Helper to format date
  const formatDueDate = (date) => {
    const dueDate = new Date(date);
    return dueDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
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
            : 'bg-neutral-700'}`}
      >
        <h3 className="font-medium flex w-full justify-between text-neutral-100">
          {task.title}
          {
            task.assignedTo && (
              <div title={task.assignedTo} className='rounded-full w-[24px] h-[24px] flex items-center justify-center bg-blue-500'>
                {task.assignedTo?.toUpperCase()?.charAt(0)}
              </div>
            )
          }
        </h3>
        <p className="mt-2 text-sm text-neutral-400 line-clamp-4">{task.description}</p>


        {task.dueDate && (
          <div className="mt-2 text-sm text-neutral-300">
            <span className="font-semibold">Due: </span>
            {formatDueDate(task.dueDate)}
          </div>
        )}
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

import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';

function Column({ column, tasks, onAddTask, dragListeners }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      {/* Title as drag handle */}
      <h2
        className="mb-4 font-semibold text-neutral-100 cursor-move"
        {...dragListeners}
      >
        {column.title}
      </h2>

      {/* Task list */}
      <div
        ref={setNodeRef}
        className="flex flex-col gap-4  max-h-[400px] mb-4"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add Task Button */}
      <button
        className="text-sm text-blue-600 bg-white p-2 rounded hover:bg-blue-100"
        onClick={() => onAddTask(column.id, `New Task in ${column.title}`)}
      >
        + Add Task
      </button>
    </div>
  );
}

export function SortableColumn({ column, tasks, onAddTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} style={style}>
      <Column column={column} tasks={tasks} onAddTask={onAddTask} dragListeners={listeners} />
    </div>
  );
}

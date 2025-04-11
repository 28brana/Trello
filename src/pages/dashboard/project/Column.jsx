import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { AddTask } from './AddTask';

export function Column({ column, tasks, onAddTask,onUpdate }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4 min-w-[300px]">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        <SortableContext
          id={column.id}
          items={tasks.map((task) => task.id)}
          strategy={rectSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onUpdate={onUpdate}/>
          ))}
        </SortableContext>
      </div>

      {/* Add Task Form */}
      <AddTask columnId={column.id} onAddTask={onAddTask} />
    </div>
  );
}

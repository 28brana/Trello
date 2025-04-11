import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Column } from './Column';

const INITIAL_COLUMNS = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const INITIAL_TASKS = [
  { id: '1', title: 'Research Project', description: 'Gather requirements', status: 'TODO' },
  { id: '2', title: 'Design System', description: 'Component library', status: 'TODO' },
  { id: '3', title: 'API Integration', description: 'Implement API', status: 'IN_PROGRESS' },
  { id: '4', title: 'Testing', description: 'Write unit tests', status: 'DONE' },
];

export default function App() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // Moving columns
    if (columns.some(col => col.id === active.id)) {
      if (active.id !== over.id) {
        const oldIndex = columns.findIndex(c => c.id === active.id);
        const newIndex = columns.findIndex(c => c.id === over.id);
        setColumns(arrayMove(columns, oldIndex, newIndex));
      }
      return;
    }

    // Moving tasks
    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  return (
    <div className="p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={columns.map(c => c.id)} strategy={rectSortingStrategy}>
          <div className="flex gap-8">
            {columns.map((column) => (
              <SortableColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// Sortable Column Wrapper
function SortableColumn({ column, tasks }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Column column={column} tasks={tasks} />
    </div>
  );
}

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
    if (!over || active.id === over.id) return;

    // Handle column movement
    const activeColumnIndex = columns.findIndex(c => c.id === active.id);
    if (activeColumnIndex !== -1) {
      const overColumnIndex = columns.findIndex(c => c.id === over.id);
      if (overColumnIndex !== -1) {
        setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
      }
      return;
    }

    // Handle task movement
    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    // Case 1: Dropping on another task
    const overTask = tasks.find(t => t.id === over.id);
    if (overTask) {
      if (activeTask.status === overTask.status) {
        // Move within same column
        const columnTasks = tasks.filter(t => t.status === activeTask.status);
        const oldIndex = columnTasks.findIndex(t => t.id === active.id);
        const newIndex = columnTasks.findIndex(t => t.id === over.id);

        setTasks(prev => [
          ...prev.filter(t => t.status !== activeTask.status),
          ...arrayMove(columnTasks, oldIndex, newIndex)
        ]);
      } else {
        // Move to different column (position based on over task)
        setTasks(prev => prev.map(t =>
          t.id === active.id ? { ...t, status: overTask.status } : t
        ));
      }
      return;
    }

    // Case 2: Dropping on a column
    const overColumn = columns.find(c => c.id === over.id);
    if (overColumn) {
      setTasks(prev => prev.map(t =>
        t.id === active.id ? { ...t, status: overColumn.id } : t
      ));
    }
  }
  return (
    <div className="p-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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

import { closestCenter, DndContext, DragOverlay, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove
} from '@dnd-kit/sortable';
import { useState } from 'react';
import AddColumn from './AddColumn';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { v4 as uuidv4 } from 'uuid';
import MainLayout from '../../../layout';

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
  const [activeId, setActiveId] = useState(null);

  const activeTask = tasks.find(task => task.id === activeId);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeColumnIndex = columns.findIndex(c => c.id === active.id);
    if (activeColumnIndex !== -1) {
      const overColumnIndex = columns.findIndex(c => c.id === over.id);
      if (overColumnIndex !== -1) {
        setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
      }
      return;
    }

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overTask = tasks.find(t => t.id === over.id);
    if (overTask) {
      if (activeTask.status === overTask.status) {
        const columnTasks = tasks.filter(t => t.status === activeTask.status);
        const oldIndex = columnTasks.findIndex(t => t.id === active.id);
        const newIndex = columnTasks.findIndex(t => t.id === over.id);

        setTasks(prev => [
          ...prev.filter(t => t.status !== activeTask.status),
          ...arrayMove(columnTasks, oldIndex, newIndex)
        ]);
      } else {
        setTasks(prev => prev.map(t =>
          t.id === active.id ? { ...t, status: overTask.status } : t
        ));
      }
      return;
    }

    const overColumn = columns.find(c => c.id === over.id);
    if (overColumn) {
      setTasks(prev => prev.map(t =>
        t.id === active.id ? { ...t, status: overColumn.id } : t
      ));
    }
  }

  function handleAddColumn(title) {
    const id = uuidv4();
    setColumns(prev => [...prev, { id, title }]);
  }

  function handleAddTask(columnId, title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: columnId
    };
    setTasks(prev => [...prev, newTask]);
  }

  function handleUpdateTask(taskId, updatedFields) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5, // drag only starts after moving 5px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <MainLayout>
      <div className="p-4 overflow-auto min-h-[85vh] dark-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-8">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
                onAddTask={handleAddTask}
                onUpdate={handleUpdateTask}
              />
            ))}
            <AddColumn onAdd={handleAddColumn} />
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} blur={true} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </MainLayout>
  );
}



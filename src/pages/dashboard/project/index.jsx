import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable';
import { SortableColumn } from './Column';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addColumnAction, reorderTasks } from '../../../redux/slice/column.slice';
import { addTask, moveTask } from '../../../redux/slice/task.slice';
import { v4 as uuidv4 } from 'uuid';
import { reorderColumns } from '../../../redux/slice/project.slice';

export default function Board() {
  const dispatch = useDispatch();
  const { id: projectId } = useParams();

  // Get project
  const projectList = useSelector((state) => state.projects.list);
  const projectObject = projectList.find((project) => project.id === projectId);

  // Get all columns related to the project
  const columnsList = useSelector((state) => state.columns.list);
  const filterColumnsList = columnsList.filter((col) => col.projectId === projectId);
  
  // Order columns by taskOrder array from the project
  const orderedColumns = projectObject?.columnOrder
    ?.map((columnId) => filterColumnsList.find((col) => col.id === columnId))
    .filter(Boolean) || [];

  // Get all tasks related to project columns
  const tasksList = useSelector((state) => state.tasks.list);
  const projectTasks = tasksList.filter((task) =>
    filterColumnsList.some((col) => col.id === task.columnId)
  );

  const handleAddNewColumn = (columnTitle) => {
    const newColumn = {
      id: uuidv4(),
      projectId,
      title: columnTitle,
      taskIds: []
    };

    dispatch(addColumnAction(newColumn));

    const newColumnOrder = [...(projectObject?.columnOrder || []), newColumn.id];
    dispatch(
      reorderColumns({
        projectId,
        columnOrder: newColumnOrder
      })
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Reorder columns
    if (filterColumnsList.some(col => col.id === activeId)) {
      const oldIndex = orderedColumns.findIndex(c => c.id === activeId);
      const newIndex = orderedColumns.findIndex(c => c.id === overId);
      if (oldIndex !== newIndex) {
        const newOrder = arrayMove(orderedColumns, oldIndex, newIndex).map(col => col.id);
        dispatch(reorderColumns({ projectId, columnOrder: newOrder }));
      }
      return;
    }

    // Find source and destination columns
    const sourceColumn = filterColumnsList.find(col => 
      col.taskIds.includes(activeId)
    );
    const destinationColumn = filterColumnsList.find(col => 
      col.id === over.data.current?.columnId || col.id === sourceColumn?.id
    );

    if (!sourceColumn || !destinationColumn) return;

    // Moving within the same column
    if (sourceColumn.id === destinationColumn.id) {
      const oldIndex = sourceColumn.taskIds.indexOf(activeId);
      const newIndex = destinationColumn.taskIds.indexOf(overId);
      
      if (oldIndex !== newIndex) {
        const newTaskIds = arrayMove(
          sourceColumn.taskIds,
          oldIndex,
          newIndex
        );
        dispatch(reorderTasks({
          columnId: sourceColumn.id,
          taskIds: newTaskIds
        }));
      }
    } 
    // Moving to different column
    else {
      // Remove from source column
      const sourceTaskIds = sourceColumn.taskIds.filter(id => id !== activeId);
      dispatch(reorderTasks({
        columnId: sourceColumn.id,
        taskIds: sourceTaskIds
      }));

      // Add to destination column
      const destinationIndex = destinationColumn.taskIds.indexOf(overId);
      const newDestinationTaskIds = [...destinationColumn.taskIds];
      newDestinationTaskIds.splice(destinationIndex, 0, activeId);
      
      dispatch(reorderTasks({
        columnId: destinationColumn.id,
        taskIds: newDestinationTaskIds
      }));

      // Update task's column reference
      dispatch(moveTask({
        taskId: activeId,
        columnId: destinationColumn.id
      }));
    }
  };

  const handleAddNewTask = (columnId, title, description = '') => {
    const newTask = {
      id: uuidv4(),
      columnId,
      title,
      description,
    };
    dispatch(addTask(newTask));
    
    // Update the column's task order
    const column = filterColumnsList.find(col => col.id === columnId);
    if (column) {
      dispatch(reorderTasks({
        columnId,
        taskIds: [...column.taskIds, newTask.id]
      }));
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => handleAddNewColumn('New Column')}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Column
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedColumns.map(col => col.id)} strategy={rectSortingStrategy}>
          <div className="flex gap-8 mt-4">
            {orderedColumns.map((column) => (
              <SortableColumn
                key={column.id}
                column={column}
                tasks={column.taskIds
                  .map(taskId => projectTasks.find(task => task.id === taskId))
                  .filter(Boolean)}
                onAddTask={handleAddNewTask}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
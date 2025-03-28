import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTaskBoard } from "../hooks/useTaskBoard";
import TaskColumn from "../components/task-column";
import Loaders from "@/components/loading/loaders";

const TaskBoard: React.FC = () => {
  const { taskStatuses, isLoading, isError } = useTaskBoard();

  if (isLoading)
    return (
      <div className="min-h-[88vh] flex items-center justify-center">
        <Loaders />
      </div>
    );
  if (isError) return <p>Error fetching tasks.</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-row gap-2 overflow-x-auto overflow-y-auto p-5 min-w-[90vw] min-h-[88vh]">
        {taskStatuses.map((status) => (
          <TaskColumn key={status.id} status={status} />
        ))}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;

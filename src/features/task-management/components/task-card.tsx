import React from "react";
import { useDrag } from "react-dnd";
import { StatusResponseTaskManagement } from "../types/status-response.types";
import Badge from "@/components/badge/badge";

interface TaskCardProps {
  task: StatusResponseTaskManagement;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dragRef = React.useRef<HTMLDivElement>(null);
  drag(dragRef);

  return (
    <div
      ref={dragRef}
      className={`p-3 flex flex-col gap-2 bg-primary-100 rounded-lg border border-support-100/30 cursor-grab transition-all duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h4 className="font-semibold text-support-100 transition-all duration-300">
        {task.name}
      </h4>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-support-100/50 line-clamp-2">
          {task.description}
        </p>
        <Badge
          name={task.taskPriority?.name}
          color={task.taskPriority?.color}
        />
      </div>
    </div>
  );
};

export default TaskCard;

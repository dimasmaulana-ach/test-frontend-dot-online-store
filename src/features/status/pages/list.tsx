import React from "react";
import { useTaskStatusList } from "../hooks/useTaskStatusList";
import { useTaskManagement } from "../hooks/useTaskManagement";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

const StatusList = () => {
  const { taskStatus } = useTaskStatusList();
  const { setTaskAdd, taskAdd, setRenderDrawerComponents } =
    useTaskManagement();
  return (
    <div>
      <div>
        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => {
            setTaskAdd({ ...taskAdd, status: true });
            setRenderDrawerComponents({ components: "StatusAddStatus" });
          }}
        >
          <Icon path={mdiPlus} size={1} />
          <p className="md:block hidden">Add Task</p>
        </button>
      </div>
      <ul className="list-disc pl-5">
        {taskStatus.map((status) => (
          <li key={status.id} className="py-2">
            {status.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusList;

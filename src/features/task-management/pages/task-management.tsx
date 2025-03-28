import React from "react";
import { useTaskBoard } from "../hooks/useTaskBoard";
import Loaders from "@/components/loading/loaders";
import Drawer from "@/components/drawer/drawer";
import FormAddStatus from "../components/form-add-status";
import clsx from "clsx";
import TaskBoard from "../components/task-board";
import { useTaskManagement } from "../hooks/useTaskManagement";
import TaskDetails from "../components/task-details";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import FormAddTask from "../components/form-add-task";

const TaskManagemt: React.FC = () => {
  const { taskStatuses, isLoading, isError, refetch } = useTaskBoard();
  const {
    taskAdd,
    setTaskAdd,
    position,
    setPosition,
    taskManagementTabs,
    openDetailTask,
    setOpenDetailTask,
    renderDrawerComponents,
    setRenderDrawerComponents,
  } = useTaskManagement();

  if (isLoading)
    return (
      <div className="min-h-[88vh] flex items-center justify-center">
        <Loaders />
      </div>
    );
  if (isError) return <p>Error fetching tasks.</p>;

  return (
    <div className="p-5 flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          {taskManagementTabs.map((item, i) => (
            <button
              className={clsx(
                "flex flex-row gap-1 items-center rounded-full px-5",
                position === item.value ? "btn-primary" : "btn-outline"
              )}
              key={i}
              onClick={() => setPosition(item.value)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => {
            if (position === "board") {
              setTaskAdd({ ...taskAdd, task: true });
              setRenderDrawerComponents({ components: "TaskAddTask" });
            }
            if (position === "status") {
              setTaskAdd({ ...taskAdd, status: true });
              setRenderDrawerComponents({ components: "TaskAddStatus" });
            }
          }}
        >
          <Icon path={mdiPlus} size={1} />
          <p className="md:block hidden">
            Add{" "}
            {position === "board" ? "Task" : "Status"}
          </p>
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-auto min-w-[90vw] min-h-[90vh]">
        <div>
          {position === "board" ? (
            <div>
              <TaskBoard
                taskStatuses={taskStatuses}
                openTaskDetail={(taskId) => {
                  setOpenDetailTask({ open: true, taskId });
                  setRenderDrawerComponents({ components: "TaskDetails" });
                }}
              />
            </div>
          ) : position === "status" ? (
            <div className="flex flex-row gap-2"></div>
          ) : (
            <div className="flex flex-row gap-2"></div>
          )}
        </div>
      </div>

      <Drawer
        isOpen={taskAdd.status || taskAdd.task || openDetailTask.open}
        onClose={() => {
          setTaskAdd({ ...taskAdd, status: false, task: false });
          setOpenDetailTask({ ...openDetailTask, open: false });
        }}
        placement="right"
        title={
          taskAdd.status
            ? "Add Status"
            : taskAdd.task
            ? "Add Task"
            : openDetailTask.open
            ? "Task Details"
            : ""
        }
      >
        {
          {
            TaskDetails: <TaskDetails taskId={openDetailTask.taskId} />,
            TaskAddStatus: (
              <FormAddStatus
                lengthOfStatus={taskStatuses.length + 1}
                handleSubmitted={() => {
                  refetch();
                  setTaskAdd({ ...taskAdd, status: false });
                }}
              />
            ),
            TaskAddTask: (
              <div>
                <FormAddTask
                  handleSubmitted={() => {
                    refetch();
                    setTaskAdd({ ...taskAdd, task: false });
                  }}
                />
              </div>
            ),
            TaskEdit: <div>Edit Task Component</div>,
          }[renderDrawerComponents.components]
        }
        {/* {taskAdd.task ? (
          <></>
        ) : (
          <FormAddStatus
            lengthOfStatus={taskStatuses.length + 1}
            handleSubmitted={() => {
              refetch();
              setTaskAdd({ ...taskAdd, status: false });
            }}
          />
        )} */}
      </Drawer>
    </div>
  );
};

export default TaskManagemt;

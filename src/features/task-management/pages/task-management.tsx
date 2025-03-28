import React from "react";
import { useTaskBoard } from "../hooks/useTaskBoard";
import Loaders from "@/components/loading/loaders";
import Drawer from "@/components/drawer/drawer";
import TaskBoard from "../components/task-board";
import { useTaskManagement } from "../hooks/useTaskManagement";
import TaskDetails from "../components/task-details";
import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import FormAddTask from "../components/form-add-task";
import FormEditTask from "../components/form-edit-task";

const TaskManagemt: React.FC = () => {
  const { taskStatuses, isLoading, isError, refetch, handleDeleteTask } =
    useTaskBoard();
  const {
    taskAdd,
    setTaskAdd,
    openDetailTask,
    openEditTask,
    setOpenEditTask,
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
    <div className="p-5 flex flex-col gap-1 overflow-x-hidden">
      <div className="flex flex-row justify-between items-center">
        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => {
            setTaskAdd({ ...taskAdd, task: true });
            setRenderDrawerComponents({ components: "TaskAddTask" });
          }}
        >
          <Icon path={mdiPlus} size={1} />
          <p className="md:block hidden">Add Task</p>
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-auto">
        <div className="min-w-[90vw] min-h-[90vh]">
          <TaskBoard
            taskStatuses={taskStatuses}
            openTaskDetail={(taskId) => {
              setOpenDetailTask({ open: true, taskId });
              setRenderDrawerComponents({ components: "TaskDetails" });
            }}
          />
        </div>
      </div>

      <Drawer
        isOpen={taskAdd.task || openDetailTask.open}
        onClose={() => {
          setTaskAdd({
            ...taskAdd,
            task: false,
          });
          setOpenDetailTask({ ...openDetailTask, open: false });
        }}
        placement="right"
        title={
          renderDrawerComponents.components === "TaskDetails"
            ? "Task Details"
            : renderDrawerComponents.components === "TaskAddTask"
            ? "Add Task"
            : "Edit Task"
        }
      >
        {
          {
            TaskDetails: (
              <TaskDetails
                taskId={openDetailTask.taskId}
                openEditTask={function (taskId: string): void {
                  setOpenEditTask({ ...openEditTask, open: true, taskId });
                  setRenderDrawerComponents({ components: "TaskEdit" });
                }}
                openDeleteTask={(id) => {
                  setOpenDetailTask({ ...openDetailTask, open: false });
                  handleDeleteTask(id).then(() => {
                    refetch();
                  });
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
            TaskEdit: (
              <FormEditTask
                id={openDetailTask.taskId}
                handleSubmitted={() => {
                  refetch();
                  setOpenDetailTask({ ...openDetailTask, open: false });
                }}
              />
            ),
          }[renderDrawerComponents.components]
        }
      </Drawer>
    </div>
  );
};

export default TaskManagemt;

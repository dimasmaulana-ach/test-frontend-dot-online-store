import React, { useState } from "react";

export const useTaskManagement = () => {
  const [taskAdd, setTaskAdd] = React.useState<{
    status: boolean;
    task: boolean;
  }>({
    status: false,
    task: false,
  });
  const [position, setPosition] = React.useState<string>("board");
  const [openDetailTask, setOpenDetailTask] = React.useState<{
    open: boolean;
    taskId: string;
  }>({
    open: false,
    taskId: "",
  });

  const [renderDrawerComponents, setRenderDrawerComponents] = useState<{
    components: "TaskDetails" | "TaskAddStatus" | "TaskAddTask" | "TaskEdit";
  }>({
    components: "TaskDetails",
  });

  const taskManagementTabs = [
    {
      name: "Board",
      value: "board",
    },
    {
      name: "Status",
      value: "status",
    },
    {
      name: "Priority",
      value: "priority",
    },
  ];

  return {
    taskAdd,
    setTaskAdd,
    position,
    setPosition,
    taskManagementTabs,
    openDetailTask,
    setOpenDetailTask,
    renderDrawerComponents,
    setRenderDrawerComponents,
  };
};

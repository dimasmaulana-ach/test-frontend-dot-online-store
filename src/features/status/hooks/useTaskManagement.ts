import React, { useState } from "react";

export const useTaskManagement = () => {
  const [taskAdd, setTaskAdd] = React.useState<{
    status: boolean;
  }>({
    status: false,
  });
  const [openDetailTask, setOpenDetailTask] = React.useState<{
    open: boolean;
    taskId: string;
  }>({
    open: false,
    taskId: "",
  });

  const [renderDrawerComponents, setRenderDrawerComponents] = useState<{
    components: "StatusDetails" | "StatusAddStatus" | "StatusEdit";
  }>({
    components: "StatusDetails",
  });

  // const taskManagementTabs = [
  //   {
  //     name: "Board",
  //     value: "board",
  //   },
  //   {
  //     name: "Status",
  //     value: "status",
  //   },
  //   {
  //     name: "Priority",
  //     value: "priority",
  //   },
  // ];

  return {
    taskAdd,
    setTaskAdd,
    openDetailTask,
    setOpenDetailTask,
    renderDrawerComponents,
    setRenderDrawerComponents,
  };
};

// import React, { useState } from "react";

// export const useTaskManagement = () => {
//   const [taskAdd, setTaskAdd] = React.useState<{
//     status: boolean;
//     task: boolean;
//     priority: boolean;
//   }>({
//     status: false,
//     task: false,
//     priority: false,
//   });
//   const [position, setPosition] = React.useState<string>("board");
//   const [openDetailTask, setOpenDetailTask] = React.useState<{
//     open: boolean;
//     taskId: string;
//   }>({
//     open: false,
//     taskId: "",
//   });

//   const [renderDrawerComponents, setRenderDrawerComponents] = useState<{
//     components:
//       | "TaskDetails"
//       | "TaskAddStatus"
//       | "TaskAddTask"
//       | "TaskEdit"
//       | "TaskAddPriority";
//   }>({
//     components: "TaskDetails",
//   });

//   const taskManagementTabs = [
//     {
//       name: "Board",
//       value: "board",
//     },
//     {
//       name: "Status",
//       value: "status",
//     },
//     {
//       name: "Priority",
//       value: "priority",
//     },
//   ];

//   return {
//     taskAdd,
//     setTaskAdd,
//     position,
//     setPosition,
//     taskManagementTabs,
//     openDetailTask,
//     setOpenDetailTask,
//     renderDrawerComponents,
//     setRenderDrawerComponents,
//   };
// };

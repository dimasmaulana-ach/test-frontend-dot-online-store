import auth from "@/config/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTaskStatuses } from "./useTaskBoard";

const insertTask = async (body: {
  name: string;
  description: string;
  targetDate: string;
  actualDate: string;
  taskStatusId: string;
  taskPriorityId: string;
}) => {
  const { data } = await auth.post(`/task-management`, {
    ...body,
  });
  return data;
};

const getMasterPriority = async () => {
  const { data } = await auth.get(`/task-priority`);
  return data;
};

const getMasterStatus = async () => {
  const { data } = await auth.get(`/task-status`);
  return data;
};

export const useAddTaskManagement = () => {
  const queryClient = useQueryClient();

  /**
   * Get master priority
   * @returns {Promise<any>} - The master priority data
   * @description This function fetches the master priority data from the API.
   */
  const { data: masterPriority } = useQuery({
    queryKey: ["master-task-priority"],
    queryFn: getMasterPriority,
  });

  /**
   * Get master status
   * @returns {Promise<any>} - The master status data
   * @description This function fetches the master status data from the API.
   */

  const { data: masterStatus } = useQuery({
    queryKey: ["master-task-status"],
    queryFn: getMasterStatus,
  });

  /**
   * Initial values for the task status form
   */

  const initialValues = {
    name: "",
    description: "",
    targetDate: "",
    actualDate: "",
    taskStatusId: "",
    taskPriorityId: "",
  };

  /**
   * Create a new task status
   * @param {string} name - The name of the task status
   * @param {string} description - The description of the task status
   * @param {number} sequence - The sequence number of the task status
   * @param {string} color - The color of the task status
   * @returns {Promise<any>} - The created task status
   */

  const createTask = useMutation({
    mutationFn: insertTask,
    onSuccess: () => {
      queryClient.setQueryData(["task-status"], (oldData) => {
        const typedOldData = oldData as Array<typeof insertTask>;
        return [...typedOldData];
      });
    },
  });

  //   const createTaskStatus = async (body: {
  //     name: string;
  //     description: string;
  //     sequence: number;
  //     color: string;
  //   }) => {
  //     const { data } = await insertTask(body);
  //     queryClient.setQueryData(["task-status"], (oldData) => {
  //       const typedOldData = oldData as Array<typeof data>;
  //       return [...typedOldData, data];
  //     });
  //     return data;
  //   };

  const { data: taskStatuses } = useQuery({
    queryKey: ["task-status"],
    queryFn: fetchTaskStatuses,
  });

  return {
    taskStatuses,
    createTask,
    initialValues,
    masterPriority,
    masterStatus,
  };
};

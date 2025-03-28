import auth from "@/config/api/auth";
import {
  StatusResponse,
  StatusResponseDatum,
} from "../types/status-response.types";
import { useQuery } from "@tanstack/react-query";

const getTaskStatus = async (): Promise<StatusResponseDatum[]> => {
  const { data } = await auth.get<StatusResponse>(`/task-status`);
  return data.data;
};

export const useTaskStatusList = () => {
  const {
    data: taskStatus = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["list-task-status"],
    queryFn: getTaskStatus,
  });

  return { taskStatus, isLoading, isError, refetch };
};

import auth from "@/config/api/auth";
import {
  PriorityResponse,
  PriorityResponseDatum,
} from "../types/priority-response.types";
import { useQuery } from "@tanstack/react-query";

export const fetchTaskPriority = async (): Promise<PriorityResponseDatum[]> => {
  const { data } = await auth.get<PriorityResponse>("/task-priority");
  return data.data;
};

export const useTaskPriority = () => {
  const {
    data: taskPriority = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task-priority"],
    queryFn: fetchTaskPriority,
  });

  return { taskPriority, isLoading, isError, refetch };
};

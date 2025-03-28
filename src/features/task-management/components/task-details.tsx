import Preview from "@/components/preview/preview";
import { useTaskDetails } from "../hooks/useTaskDetails";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil } from "@mdi/js";
import Loaders from "@/components/loading/loaders";

export interface TaskDetailsProps {
  taskId: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = (props) => {
  const { data, isLoading } = useTaskDetails(props.taskId);

  if (isLoading)
    return (
      <div className="min-h-[88vh] flex items-center justify-center">
        <Loaders />
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-4 ">
        {data?.map((item, i) => (
          <Preview title={item.label} key={i}>
            {item.value}
          </Preview>
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-5">
        <button className="btn-primary flex flex-row gap-1 items-center">
          <Icon path={mdiPencil} size={1} />
          Edit
        </button>
        <button className="btn-primary flex flex-row gap-1 items-center">
          <Icon path={mdiDelete} size={1} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;

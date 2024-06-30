type Task = {
  id: number;
  attributes: {
    title: string;
    description: string;
    status: TaskStatus;
  };
};

type TaskStatus = 'complete' | 'uncomplete';
type TaskFilter = {
  name: string;
  value: string;
  field: string;
};

export type { Task, TaskFilter, TaskStatus };

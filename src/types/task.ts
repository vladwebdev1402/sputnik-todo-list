type Task = {
  id: number;
  attributes: {
    title: string;
    description: string;
    status: TaskStatus;
  };
};

type TaskStatus = 'Выполнено' | 'Не выполнено';
type TaskFilter = {
  name: string;
  value: string;
  field: string;
};

export type { Task, TaskFilter, TaskStatus };

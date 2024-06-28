type Task = {
  id: number;
  attributes: {
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type TaskStatus = 'Выполнено' | 'Не выполнено';
type TaskFilter = 'Все' | 'Не выполнено' | 'Выполнено' | 'Избранные';

export type { Task, TaskFilter, TaskStatus };

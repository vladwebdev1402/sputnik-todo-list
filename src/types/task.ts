type Task = {
  id: number;
  attributes: {
    title: string;
    description: string;
    status: 'Выполнено' | 'Не выполнено';
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

type TaskFilter = 'Все' | 'Не выполнено' | 'Выполнено' | 'Избранные';

export type { Task, TaskFilter };

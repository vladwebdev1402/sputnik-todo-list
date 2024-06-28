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

export type { Task };

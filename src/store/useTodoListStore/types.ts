import { Task } from '@/types';

type CreateTaskData = {
  title: string;
  description: string;
  status: string;
};

type GetTasksResponse = {
  data: Task[];
  meta: { pagination: { total: number } };
};

export type { CreateTaskData, GetTasksResponse };

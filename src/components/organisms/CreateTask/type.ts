import { TaskStatus } from '@/types';

type TaskFormData = {
  title: string;
  description: string;
  status: TaskStatus;
};

export type { TaskFormData };

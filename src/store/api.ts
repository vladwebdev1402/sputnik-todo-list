import { axiosInstance } from '@/api';
import { Task } from '@/types';

import { CreateTaskData } from './types';

class TaskApi {
  static async getTasks(limit: number) {
    const result = await axiosInstance.get<{
      data: Task[];
      meta: { pagination: { total: number } };
    }>(`/tasks?pagination[limit]=${limit}`);
    return result.data;
  }

  static async createTask(task: CreateTaskData) {
    const result = await axiosInstance.post<{ data: Task }>('/tasks', {
      data: {
        ...task,
      },
    });
    return result.data.data;
  }

  static async deleteTask(id: number) {
    await axiosInstance.delete(`/tasks/${id}`);
  }

  static async updateTask(task: Task) {
    const result = await axiosInstance.put<{ data: Task }>(
      `/tasks/${task.id}`,
      {
        data: {
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
        },
      }
    );

    return result.data.data;
  }
}

export { TaskApi };

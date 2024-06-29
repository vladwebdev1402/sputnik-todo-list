import { axiosInstance } from '@/api';
import { Task, TaskFilter } from '@/types';

import { CreateTaskData } from './types';

class TaskApi {
  static async getTasks(limit: number, filter: TaskFilter) {
    const result = await axiosInstance.get<{
      data: Task[];
      meta: { pagination: { total: number } };
    }>(
      `/tasks?pagination[limit]=${limit}&${
        filter.value !== '' ? `${filter.field}=${filter.value}` : ''
      }`
    );
    return result.data;
  }

  static async getTask(id: number) {
    try {
      const result = await axiosInstance.get<{ data: Task }>(`/tasks/${id}`);
      return result.data.data;
    } catch (error) {
      return id;
    }
  }

  static async getFavorites(favorites: number[]) {
    const rejectedIdFavorites: number[] = [];
    const successTask: Task[] = [];

    const result = await Promise.allSettled(
      favorites.map((id) => this.getTask(id))
    );

    result.forEach((item) => {
      if (item.status === 'fulfilled' && typeof item.value !== 'number')
        successTask.push(item.value);
      if ('value' in item && typeof item.value === 'number')
        rejectedIdFavorites.push(item.value);
    });

    return { successTask, rejectedIdFavorites };
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

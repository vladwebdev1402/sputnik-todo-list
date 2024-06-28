import { axiosInstance } from '@/api';
import { Task } from '@/types';

class TaskApi {
  static async getTasks() {
    const result = (await axiosInstance.get<{ data: Task[] }>('/tasks')).data
      .data;
    return result;
  }
}

export { TaskApi };

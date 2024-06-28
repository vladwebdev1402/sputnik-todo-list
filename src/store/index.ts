import { create } from 'zustand';

import { Task, TaskFilter } from '@/types';

import { mockTasks } from './data';
import { TaskApi } from './api';
import { CreateTaskData } from './types';

type State = {
  filter: TaskFilter;
  tasks: Task[] | null;
  isCreateLoading: boolean;
  isDeleteLoading: boolean;
  isLoading: boolean;
  error: string;
};

type Action = {
  changeFilter: (filter: State['filter']) => void;
  getTasks: () => void;
  createTask: (data: CreateTaskData) => void;
  deleteTask: (id: number) => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  filter: 'Все',
  tasks: mockTasks,
  isCreateLoading: false,
  isDeleteLoading: false,
  isLoading: false,
  error: '',

  changeFilter: (filter) => set(() => ({ filter })),

  getTasks: async () => {
    try {
      set({ isLoading: true });
      const result = await TaskApi.getTasks();
      set({ isLoading: false });
      set({ tasks: result });
    } catch (e) {
      set({ isLoading: false });
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },

  createTask: async (task) => {
    try {
      set({ isCreateLoading: true });
      const newTask = await TaskApi.createTask(task);
      set({ isCreateLoading: false });
      set((state) => ({
        tasks: state.tasks ? [...state.tasks, newTask] : null,
      }));
    } catch (e) {
      set({ isCreateLoading: false });
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ isDeleteLoading: true });
      await TaskApi.deleteTask(id);
      set({ isDeleteLoading: false });
      set((state) => ({
        tasks: state.tasks
          ? state.tasks.filter((task) => task.id !== id)
          : null,
      }));
    } catch (e) {
      set({ isDeleteLoading: false });
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },
}));

export { useTodoListStore };

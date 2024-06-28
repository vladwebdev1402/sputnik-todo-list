import { create } from 'zustand';

import { Task, TaskFilter } from '@/types';
import { LocalStorageService } from '@/api';
import { LIMIT } from '@/constants';

import { TaskApi } from './api';
import { CreateTaskData } from './types';

type State = {
  filter: TaskFilter;
  limit: number;
  total: number;
  tasks: Task[] | null;
  favorites: number[];
  isCreateLoading: boolean;
  isLoading: boolean;
  error: string;
};

type Action = {
  changeFilter: (filter: State['filter']) => void;
  changeFavorite: (id: number) => void;
  incrementLimit: () => void;
  getTasks: (limit: number) => void;
  createTask: (data: CreateTaskData) => void;
  deleteTask: (id: number) => void;
  updateTask: (task: Task) => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  filter: 'Все',
  tasks: null,
  favorites: LocalStorageService.getFavorites(),
  limit: LIMIT,
  total: 10000,
  isCreateLoading: false,
  isLoading: false,
  error: '',

  changeFilter: (filter) => set(() => ({ filter })),

  incrementLimit: () => set((state) => ({ limit: state.limit + LIMIT })),

  changeFavorite: (id) => {
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((item) => item !== id)
        : [...state.favorites, id];

      LocalStorageService.setFavorites(newFavorites);
      return { favorites: newFavorites };
    });
  },

  getTasks: async (limit) => {
    try {
      set({ isLoading: true });
      const result = await TaskApi.getTasks(limit);
      set({ isLoading: false });
      set({ tasks: result.data });
      set({ total: result.meta.pagination.total });
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
      await TaskApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks
          ? state.tasks.filter((task) => task.id !== id)
          : null,
      }));
    } catch (e) {
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },

  updateTask: async (task) => {
    try {
      const newTask = await TaskApi.updateTask(task);
      set((state) => ({
        tasks: state.tasks
          ? state.tasks.map((item) => (item.id === newTask.id ? newTask : item))
          : null,
      }));
    } catch (e) {
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },
}));

export { useTodoListStore };

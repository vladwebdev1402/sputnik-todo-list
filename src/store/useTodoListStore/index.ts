import { create } from 'zustand';

import { Task, TaskFilter } from '@/types';
import { LocalStorageService } from '@/api/localeStorage';

import { TaskApi } from './api';
import { CreateTaskData } from './types';

type State = {
  total: number;
  tasks: Task[] | null;
  favorites: number[];
  isLoading: boolean;
  error: string;
};

type Action = {
  changeFavorite: (id: number) => void;
  getTasks: (limit: number, filter: TaskFilter) => void;
  createTask: (data: CreateTaskData) => void;
  deleteTask: (id: number) => void;
  updateTask: (task: Task) => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  tasks: null,
  favorites: LocalStorageService.getFavorites(),
  total: 10000,
  isLoading: false,
  error: '',
  changeFavorite: (id) => {
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((item) => item !== id)
        : [...state.favorites, id];

      LocalStorageService.setFavorites(newFavorites);
      return { favorites: newFavorites };
    });
  },

  getTasks: async (limit, filter) => {
    try {
      set({ isLoading: true });
      set({ error: '' });

      if (filter.value === 'Избранные') {
        const result = await TaskApi.getFavorites(
          LocalStorageService.getFavorites()
        );

        const newFavorites = LocalStorageService.getFavorites().filter(
          (id) => !result.rejectedIdFavorites.includes(id)
        );

        set({ favorites: newFavorites });
        LocalStorageService.setFavorites(newFavorites);

        set({ tasks: result.successTask });
        set({ total: result.successTask.length });
        set({ isLoading: false });
        return;
      }

      const result = await TaskApi.getTasks(limit, filter);
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
      set({ error: '' });
      const newTask = await TaskApi.createTask(task);
      set((state) => ({
        tasks: state.tasks ? [newTask, ...state.tasks] : null,
      }));
    } catch (e) {
      if (e instanceof Error) set({ error: e.message });
      else set({ error: 'Произошла неизвенстная ошибка' });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ error: '' });
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
      set({ error: '' });
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

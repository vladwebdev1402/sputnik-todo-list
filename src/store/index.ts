import { create } from 'zustand';

import { Task, TaskFilter } from '@/types';

import { mockTasks } from './data';
import { TaskApi } from './api';

type State = {
  filter: TaskFilter;
  tasks: Task[] | null;
  isLoading: boolean;
  error: string;
};

type Action = {
  changeFilter: (filter: State['filter']) => void;
  getTasks: () => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  filter: 'Все',
  tasks: mockTasks,
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
}));

export { useTodoListStore };

import { create } from 'zustand';

import { Task, TaskFilter } from '@/types';

import { mockTasks } from './data';

type State = {
  filter: TaskFilter;
  tasks: Task[] | null;
  isLoading: boolean;
  error: string;
};

type Action = {
  changeFilter: (filter: State['filter']) => void;
};

const useTodoListStore = create<State & Action>((set) => ({
  filter: 'Все',
  tasks: mockTasks,
  isLoading: false,
  error: '',
  changeFilter: (filter) => set(() => ({ filter })),
}));

export { useTodoListStore };

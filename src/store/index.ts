import { create } from 'zustand';

import { Task } from '@/types';
import { mockTasks } from './data';

type State = {
  tasks: Task[] | null;
  isLoading: boolean;
  error: string;
};

const useTodoListStore = create<State>(() => ({
  tasks: mockTasks,
  isLoading: false,
  error: '',
}));

export { useTodoListStore };

import { create } from 'zustand';

import { LIMIT } from '@/constants';
import { TaskFilter } from '@/types';

type State = {
  limit: number;
  filter: TaskFilter;
};

type Action = {
  incrementLimit: () => void;
  changeFilter: (filter: TaskFilter) => void;
};

const useTodoFilters = create<State & Action>((set) => ({
  limit: LIMIT,
  filter: {
    name: 'Все',
    value: 'Все',
    field: '',
  },
  
  incrementLimit: () => set((state) => ({ limit: state.limit + LIMIT })),

  changeFilter: (filter) => {
    set(() => ({ limit: LIMIT, filter }));
  },
}));

export { useTodoFilters };

import { TaskFilter } from '@/types';

const filters: TaskFilter[] = [
  {
    name: 'Все',
    value: 'Все',
    field: '',
  },
  {
    name: 'Не выполненные',
    value: 'uncomplete',
    field: 'filters[status]',
  },
  {
    name: 'Выполненные',
    value: 'complete',
    field: 'filters[status]',
  },
  {
    name: 'Избранные',
    value: 'Избранные',
    field: '',
  },
];

export { filters };

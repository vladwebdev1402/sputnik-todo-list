import { TaskFilter } from '@/types';

const filters: TaskFilter[] = [
  {
    name: 'Все',
    value: 'Все',
    field: '',
  },
  {
    name: 'Не выполненные',
    value: 'Не выполнено',
    field: 'filters[status]',
  },
  {
    name: 'Выполненные',
    value: 'Выполнено',
    field: 'filters[status]',
  },
  {
    name: 'Избранные',
    value: 'Избранные',
    field: '',
  },
];

export { filters };

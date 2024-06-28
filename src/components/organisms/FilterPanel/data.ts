import { TaskFilter } from "@/types";

type Filter = {
  name: string;
  value: TaskFilter;
};

const filters: Filter[] = [
  {
    name: 'Все',
    value: 'Все',
  },
  {
    name: 'Не выполненные',
    value: 'Не выполнено',
  },
  {
    name: 'Выполненные',
    value: 'Выполнено',
  },
  {
    name: 'Избранные',
    value: 'Избранные',
  },
];

export { filters };

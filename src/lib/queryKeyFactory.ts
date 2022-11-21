import type { filtersType } from 'src/components/TodoList';

const todoKeys = {
  base: [{ scope: 'todos' }] as const,
  lists: () => [{ ...todoKeys.base[0], entity: 'list' }],
  list: (filters: filtersType) => [{ ...todoKeys.base[0], entity: 'list', filters }],
  detail: (id: number) => [{ ...todoKeys.base[0], entity: 'detail', id }],
};

export { todoKeys };

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import api from 'src/api';
import { filtersType } from 'src/components/TodoList';
import { todoKeys } from 'src/lib/queryKeyFactory';

export interface IGetTodosData {
  id: number;
  value: string;
  date?: string;
  isDone: boolean;
}

interface IQueryParam {
  filters: string;
}
const getTodos = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof todoKeys['list']>>) => {
  const [{ filters }] = queryKey;
  return api.get<IGetTodosData[], IQueryParam>('/todos/list', { filters }).then((response) => response.data);
};

const useGetTodos = (filters: filtersType) => {
  return useQuery(todoKeys.list(filters), getTodos);
};
export default useGetTodos;

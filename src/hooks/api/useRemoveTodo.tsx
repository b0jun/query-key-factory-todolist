import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { todoKeys } from 'src/lib/queryKeyFactory';
import type { filtersType } from 'src/components/TodoList';
import type { IGetTodosData } from './useGetTodos';

interface ITodoId {
  id: number;
}
interface IRequestBody {
  data: ITodoId;
}

const removeTodo = async (body: ITodoId) => {
  return api.delete<null, IRequestBody>('/todos', { data: { id: body.id } });
};

const useRemoveTodo = (filters: filtersType) => {
  const queryClient = useQueryClient();

  return useMutation(removeTodo, {
    onSuccess: async (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>(todoKeys.list(filters));
      if (previousTodos && Array.isArray(previousTodos)) {
        const filteredTodos = previousTodos.filter(({ id }: ITodoId) => id !== data.id);
        queryClient.setQueryData(todoKeys.list(filters), filteredTodos);
      }
    },
  });
};
export default useRemoveTodo;

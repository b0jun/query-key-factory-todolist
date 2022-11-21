import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import type { filtersType } from 'src/components/TodoList';
import { todoKeys } from 'src/lib/queryKeyFactory';
import type { IGetTodosData } from './useGetTodos';
interface ITodoId {
  id: number;
}
interface IRequestBody {
  data: ITodoId;
}

const todoUnDone = async (body: ITodoId) => {
  return api.delete<null, IRequestBody>('/todos/done', { data: { id: body.id } });
};

const useUnDone = (filters: filtersType) => {
  const queryClient = useQueryClient();

  return useMutation(todoUnDone, {
    onSuccess: (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>(todoKeys.list(filters));
      if (previousTodos) {
        const foundIndex = previousTodos.findIndex(({ id }: ITodoId) => id === data.id);
        previousTodos[foundIndex].isDone = false;
        queryClient.setQueryData(todoKeys.list(filters), previousTodos);
      }
    },
  });
};
export default useUnDone;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import type { filtersType } from 'src/components/TodoList';
import { todoKeys } from 'src/lib/queryKeyFactory';
import type { IGetTodosData } from './useGetTodos';

interface IRequestBody {
  id: number;
}

const todoDone = async (body: IRequestBody) => {
  return api.post<null, IRequestBody>('/todos/done', body).then((response) => response.data);
};

const useDone = (filters: filtersType) => {
  const queryClient = useQueryClient();

  return useMutation(todoDone, {
    onSuccess: (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>(todoKeys.list(filters));
      if (previousTodos) {
        const foundIndex = previousTodos.findIndex(({ id }: IRequestBody) => id === data.id);
        previousTodos[foundIndex].isDone = true;
        queryClient.setQueryData(todoKeys.list(filters), previousTodos);
      }
    },
  });
};
export default useDone;

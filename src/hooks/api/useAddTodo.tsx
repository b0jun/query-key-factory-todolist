import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { todoKeys } from 'src/lib/queryKeyFactory';

import type { filtersType } from 'src/components/TodoList';
import type { IGetTodosData } from './useGetTodos';

export interface IAddTodoData {
  id: number;
}

interface IRequestBody {
  value: string;
}

const addTodo = async (body: IRequestBody) => {
  return api.post<IAddTodoData, IRequestBody>('/todos', body).then((response) => response.data);
};

const useAddTodo = (filters: filtersType) => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: ({ id }, data) => {
      if (filters === 'done') {
        queryClient.invalidateQueries(todoKeys.lists());
        return;
      }
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>(todoKeys.list(filters));
      if (previousTodos) {
        const tempTodo = {
          id,
          value: data.value,
          date: String(new Date().getTime()),
          isDone: false,
        };
        queryClient.setQueryData(todoKeys.list(filters), [...previousTodos, tempTodo]);
      }
    },
  });
};
export default useAddTodo;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { IGetTodosData } from './useGetTodos';

export interface IAddTodoData {
  id: number;
}

interface IRequestBody {
  value: string;
}

const addTodo = async (body: IRequestBody) => {
  return api.post<IAddTodoData, IRequestBody>('/todos', body).then((response) => response.data);
};

const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(addTodo, {
    onSuccess: ({ id }, data) => {
      queryClient.invalidateQueries([{ scope: 'todos', entity: 'list' }]);
      // const previousTodos = queryClient.getQueryData<IGetTodosData[]>([
      //   { scope: 'todos', entity: 'list', filters: 'all' },
      // ]);
      // console.log(previousTodos);
      // if (previousTodos) {
      //   const tempTodo = {
      //     id,
      //     value: data.value,
      //     date: String(new Date().getTime()),
      //     isDone: false,
      //   };
      //   queryClient.setQueryData([{ scope: 'todos', entity: 'list' }], [...previousTodos, tempTodo]);
      // }
    },
  });
};
export default useAddTodo;

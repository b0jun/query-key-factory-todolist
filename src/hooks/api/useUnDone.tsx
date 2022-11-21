import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { IGetTodosData } from './useGetTodos';

interface ITodoId {
  id: number;
}
interface IRequestBody {
  data: ITodoId;
}

const todoUnDone = async (body: ITodoId) => {
  return api.delete<null, IRequestBody>('/todos/done', { data: { id: body.id } });
};

const useUnDone = () => {
  const queryClient = useQueryClient();

  return useMutation(todoUnDone, {
    onSuccess: (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>([
        { scope: 'todos', entity: 'list', filters: 'all' },
      ]);
      console.log(previousTodos);
      if (previousTodos) {
        const foundIndex = previousTodos.findIndex(({ id }: ITodoId) => id === data.id);
        previousTodos[foundIndex].isDone = false;
        queryClient.setQueryData([{ scope: 'todos', entity: 'list', filters: 'all' }], previousTodos);
      }
    },
  });
};
export default useUnDone;

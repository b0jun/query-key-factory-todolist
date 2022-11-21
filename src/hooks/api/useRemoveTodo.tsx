import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { IGetTodosData } from './useGetTodos';

interface ITodoId {
  id: number;
}
interface IRequestBody {
  data: ITodoId;
}

const removeTodo = async (body: ITodoId) => {
  console.log(body);
  return api.delete<null, IRequestBody>('/todos', { data: { id: body.id } });
};

const useRemoveTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(removeTodo, {
    onSuccess: async (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>([
        { scope: 'todos', entity: 'list', filters: 'all' },
      ]);
      if (previousTodos && Array.isArray(previousTodos)) {
        const filteredTodos = previousTodos.filter(({ id }: ITodoId) => id !== data.id);
        queryClient.setQueryData([{ scope: 'todos', entity: 'list', filters: 'all' }], filteredTodos);
      }
    },
  });
};
export default useRemoveTodo;

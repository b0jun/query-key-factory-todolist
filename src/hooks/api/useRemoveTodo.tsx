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
  return api.delete<null, IRequestBody>('/todos', { data: { id: body.id } });
};

const useRemoveTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(removeTodo, {
    onSuccess: async (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>([{ scope: 'todos' }]);
      if (previousTodos && Array.isArray(previousTodos)) {
        const filteredTodos = previousTodos.filter(({ id }: ITodoId) => id !== data.id);
        queryClient.setQueryData([{ scope: 'todos' }], filteredTodos);
      }
    },
  });
};
export default useRemoveTodo;

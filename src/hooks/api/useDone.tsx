import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api';
import { IGetTodosData } from './useGetTodos';

interface IRequestBody {
  id: number;
}

const todoDone = async (body: IRequestBody) => {
  return api.post<null, IRequestBody>('/todos/done', body).then((response) => response.data);
};

const useDone = () => {
  const queryClient = useQueryClient();

  return useMutation(todoDone, {
    onSuccess: (_, data) => {
      const previousTodos = queryClient.getQueryData<IGetTodosData[]>([{ scope: 'todos' }]);
      if (previousTodos) {
        const foundIndex = previousTodos.findIndex(({ id }: IRequestBody) => id === data.id);
        previousTodos[foundIndex].isDone = true;
        queryClient.setQueryData([{ scope: 'todos' }], previousTodos);
      }
    },
  });
};
export default useDone;

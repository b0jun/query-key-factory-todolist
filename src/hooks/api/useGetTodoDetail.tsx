import { useQuery } from '@tanstack/react-query';
import api from 'src/api';

export interface IGetTodoDetailData {
  id: number;
  value: string;
  date: string;
  isDone: boolean;
}

const getTodoDetail = async ({ queryKey }: any) => {
  const [{ id }] = queryKey;
  return api.get<IGetTodoDetailData>(`/todos/detail/${id}`).then((response) => response.data);
};

const useGetTodoDetail = (id: number) => {
  return useQuery([{ scope: 'todos', entity: 'detail', id }], getTodoDetail);
};
export default useGetTodoDetail;

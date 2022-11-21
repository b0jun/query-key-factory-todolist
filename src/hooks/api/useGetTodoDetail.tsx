import { useQuery } from '@tanstack/react-query';
import api from 'src/api';
import { todoKeys } from 'src/lib/queryKeyFactory';

import type { QueryFunctionContext } from '@tanstack/react-query';
export interface IGetTodoDetailData {
  id: number;
  value: string;
  date: string;
  isDone: boolean;
}

const getTodoDetail = async ({ queryKey }: QueryFunctionContext<ReturnType<typeof todoKeys['detail']>>) => {
  const [{ id }] = queryKey;
  return api.get<IGetTodoDetailData>(`/todos/detail/${id}`).then((response) => response.data);
};

const useGetTodoDetail = (id: number) => {
  return useQuery(todoKeys.detail(id), getTodoDetail);
};
export default useGetTodoDetail;

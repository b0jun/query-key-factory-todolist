import { useQuery } from '@tanstack/react-query';
import api from 'src/api';

export interface IGetTodosData {
  id: number;
  value: string;
  date?: string;
  isDone: boolean;
}

const getTodos = async () => {
  return api.get<IGetTodosData[]>('/todos').then((response) => response.data);
};

const useGetTodos = () => {
  return useQuery([{ scope: 'todos' }], getTodos);
};
export default useGetTodos;

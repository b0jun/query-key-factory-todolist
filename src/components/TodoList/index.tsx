import TodoItem from './TodoItem';
import styles from './todoList.module.css';
import { useState } from 'react';
import TodoDetail from './TodoDetail';
import useDone from 'src/hooks/api/useDone';
import useUnDone from 'src/hooks/api/useUnDone';
import useAddTodo from 'src/hooks/api/useAddTodo';
import useRemoveTodo from 'src/hooks/api/useRemoveTodo';
import useGetTodos from 'src/hooks/api/useGetTodos';

const TodoList = () => {
  const [todo, setTodo] = useState('');

  const [detailId, setDetailId] = useState<number | null>(null);
  const openDetail = (id: number) => {
    setDetailId(id);
  };
  const closeDetail = () => {
    setDetailId(null);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const { data: todoList, isLoading } = useGetTodos();
  const { mutate: addTodo } = useAddTodo();
  const { mutate: removeTodo } = useRemoveTodo();
  const { mutate: done } = useDone();
  const { mutate: unDone } = useUnDone();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({ value: todo });
    setTodo('');
  };

  if (!todoList || isLoading) {
    return <div>로딩</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>To-Do List</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={todo}
          name="todo"
          placeholder="새로운 할일"
          maxLength={20}
          className={styles.input}
          onChange={onChange}
        />
        <button type="submit" className={styles.button} disabled={!todo}>
          +
        </button>
      </form>
      <ul className={styles.list}>
        {todoList.map(({ id, value, isDone }) => (
          <TodoItem
            key={id}
            id={id}
            value={value}
            isDone={isDone}
            openDetail={openDetail}
            done={done}
            unDone={unDone}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
      {detailId && <TodoDetail detailId={detailId} closeDetail={closeDetail} />}
    </div>
  );
};
export default TodoList;

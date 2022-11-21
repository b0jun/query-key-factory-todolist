import TodoItem from './TodoItem';
import styles from './todoList.module.css';
import React, { useState } from 'react';
import TodoDetail from './TodoDetail';
import useDone from 'src/hooks/api/useDone';
import useUnDone from 'src/hooks/api/useUnDone';
import useAddTodo from 'src/hooks/api/useAddTodo';
import useRemoveTodo from 'src/hooks/api/useRemoveTodo';
import useGetTodos from 'src/hooks/api/useGetTodos';
import cn from 'classnames';

export type filtersType = 'all' | 'done' | 'undone';

const TodoList = () => {
  const [todo, setTodo] = useState('');

  const [detailId, setDetailId] = useState<number | null>(null);
  const [filters, setFilters] = useState<filtersType>('all');
  const openDetail = (id: number) => {
    setDetailId(id);
  };
  const closeDetail = () => {
    setDetailId(null);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const { data: todoList, isLoading } = useGetTodos(filters);
  const { mutate: addTodo } = useAddTodo(filters);
  const { mutate: removeTodo } = useRemoveTodo(filters);
  const { mutate: done } = useDone(filters);
  const { mutate: unDone } = useUnDone(filters);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({ value: todo });
    setTodo('');
  };

  const filterTodos = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = event.target as HTMLButtonElement;
    setFilters(eventTarget.value as filtersType);
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
      <div className={styles.filters}>
        <h3 className={styles.filtersTitle}>필터</h3>
        <button
          value="all"
          className={cn(styles.filtersButton, { [styles.filterChecked]: filters === 'all' })}
          type="button"
          onClick={filterTodos}
        >
          전체
        </button>
        <button
          value="done"
          className={cn(styles.filtersButton, { [styles.filterChecked]: filters === 'done' })}
          type="button"
          onClick={filterTodos}
        >
          완료
        </button>
        <button
          value="undone"
          className={cn(styles.filtersButton, { [styles.filterChecked]: filters === 'undone' })}
          type="button"
          onClick={filterTodos}
        >
          미완료
        </button>
      </div>
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

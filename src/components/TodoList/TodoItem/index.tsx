import styles from './todoItem.module.css';

interface ITodoId {
  id: number;
}
interface IProps {
  id: number;
  value: string;
  isDone: boolean;
  openDetail: (id: number) => void;
  done: ({ id }: ITodoId) => void;
  unDone: ({ id }: ITodoId) => void;
  removeTodo: ({ id }: ITodoId) => void;
}

const TodoItem = ({ id, value, isDone, openDetail, done, unDone, removeTodo }: IProps) => {
  const openDetailWithSetId = () => {
    openDetail(id);
  };
  const removeTodoItem = () => {
    removeTodo({ id });
  };

  const chagneStatusTodoItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      done({ id });
      return;
    }
    unDone({ id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemWrapper}>
        <input type="checkbox" className={styles.check} checked={isDone} onChange={chagneStatusTodoItem} />
        <div className={styles.text}>{value}</div>
      </div>
      <div className={styles.buttonWrapper}>
        <button type="button" onClick={openDetailWithSetId} className={styles.button}>
          상세
        </button>
        <button type="button" onClick={removeTodoItem} className={styles.button}>
          삭제
        </button>
      </div>
    </div>
  );
};
export default TodoItem;

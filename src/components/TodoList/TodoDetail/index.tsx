import { useQuery } from '@tanstack/react-query';
import styles from './todoDetail.module.css';

interface IProps {
  detailId: number;
  closeDetail: () => void;
}
const TodoDetail = ({ detailId, closeDetail }: IProps) => {
  const getTodoDetail = async () =>
    fetch(`/todos/${detailId}`)
      .then((res) => res.json())
      .then((data) => data);

  const { data, isLoading } = useQuery(['todos', 'detail'], getTodoDetail);

  if (!data && !isLoading) {
    closeDetail();
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.wrapper}>
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>Task</h3>
          <p>{data?.value}</p>
        </div>
        <div className={styles.textWrapper}>
          <h3 className={styles.title}>Date</h3>
          <p>{data?.date}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.closeButton} onClick={closeDetail}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default TodoDetail;

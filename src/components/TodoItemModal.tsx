import styles from './TodoItemModal.module.css';

export default function TodoItemModal() {
  function offModal() {
    //...
  }

  return (
    <div className={styles.modal}>
      <div
        className={styles.overlay}
        onClick={offModal}></div>
      <div className={styles.contents}>
        <h2>Hello world!</h2>
      </div>
    </div>
  );
}

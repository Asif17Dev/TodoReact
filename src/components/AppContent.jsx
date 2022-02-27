import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};
function AppContent() {
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];

  sortedTodoList.sort((a, b) => new Date(b.tmie) - new Date(a.time));
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });
  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem className={styles.TodoItem} key={todo.id} todo={todo} />
          ))
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            No todo found.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;

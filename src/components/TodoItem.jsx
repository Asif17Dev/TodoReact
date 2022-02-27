import { format } from 'date-fns/esm';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlices';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/GetClasses';
import CheckButton from './CheckButton';
import ToDoModel from './ToDoModel';

const child = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateShowModal, setUpdateShowModal] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  function handleDelete() {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo deleted successfully');
  }

  function handleUpdate() {
    setUpdateShowModal(true);
  }

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            tabIndex={0}
            role="button"
            onClick={handleDelete}
            onKeyDown={handleDelete}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            tabIndex={0}
            role="button"
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <ToDoModel
        todo={todo}
        type="update"
        showModal={updateShowModal}
        setShowModal={setUpdateShowModal}
      />
    </>
  );
}

export default TodoItem;

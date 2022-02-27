import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import style from '../styles/modules/app.module.scss';
import ToDoModel from './ToDoModel';
import { updateFilterStatus } from '../slices/todoSlices';

function AppHeader() {
  const [showModal, setShowModal] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };
  return (
    <div className={style.appHeader}>
      <Button
        onClick={() => setShowModal(true)}
        onKeyDown={() => setShowModal(true)}
      >
        Add Task
      </Button>
      <SelectButton value={filterStatus} onChange={updateFilter}>
        <option value="all">all</option>
        <option value="incomplete">incomplete</option>
        <option value="complete">completed</option>
      </SelectButton>
      <ToDoModel type="add" showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
export default AppHeader;

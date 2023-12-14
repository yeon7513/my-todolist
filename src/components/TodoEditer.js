import React, { useContext, useRef, useState } from 'react';
import { TodoDispatchContext } from '../App';
import '../scss/todoEditer.scss';
import { Button, NewTodoLabel, TodoEditerWrap } from './StyledComponent';

function TodoEditer({day, isOpen}) {
  const {onCreate} = useContext(TodoDispatchContext);
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [allDay, setAllDay] = useState(false);
  const inputRef = useRef('');
  const timeRef = useRef('');

  console.log('day: ', day);

  const onChangeContent = (e) => {
    const input = e.target;
    const label = input.nextSibling;
  
    if (input.value.trim() !== '') {
      label.classList.add('hasValue');
    } else {
      label.classList.remove('hasValue');
    }
    setContent(input.value);
  };
  const onChangeTime = (e) => {
    setTime(e.target.value);
  };
  const onToggleAllDay = () => {
    setAllDay(!allDay);
  };

  const onSubmit = () => {
    if(!content) {
      inputRef.current.focus();
      return;
    }
    if (!time && !allDay) {
      timeRef.current.focus();
      return;
    }
    const todoData = {
      content,
      time : allDay ? 'ALL DAY' : time
    }
    onCreate(todoData.content, todoData.time, day);
    inputRef.current.value = '';
    timeRef.current.value = '';
    setContent('');
    setTime('');
    setAllDay(false);
  };

  return (
    <TodoEditerWrap $isOpen={isOpen} $day={day}>
      <div className="editer-wrapper">
        {/* new todo */}
        <div className="add-todo">
          <input id={`${day}-new-todo`} className='new-todo input' ref={inputRef} type="text" onChange={onChangeContent} required="" />
          <NewTodoLabel htmlFor={`${day}-new-todo`}>NEW TODO</NewTodoLabel>
          <div className="underline"></div>
        </div>
        {/* new time */}
        <div className="add-time">
          <div className='add-time-item'>
            <input id={`${day}-new-time`} className='new-time input' ref={timeRef} type="time" onChange={onChangeTime} disabled={allDay} />
            <NewTodoLabel htmlFor={`${day}-new-time`}>TIME</NewTodoLabel>
            <div className="underline"></div>
          </div>
          {/* all day checkbox */}
          <div className='add-time-check'>
            <div className="add-time-box">
              <label htmlFor={`${day}-new-allday`} className='new-allday-label'>
                <input id={`${day}-new-allday`} className='allday' type="checkbox" onChange={onToggleAllDay} checked={allDay} />
                <span className="checkmark"></span>
              </label>
            </div>
            <label htmlFor={`${day}-new-allday`} className='allday-label'>
              ALL DAY
            </label>
          </div>
        </div>
        {/* add button */}
        <div className="add-btn">
          <Button onClick={onSubmit}>추가</Button>
        </div>
      </div>
    </TodoEditerWrap>
  )
};

export default TodoEditer;
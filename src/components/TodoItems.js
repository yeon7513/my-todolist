import React, { useContext, useState } from 'react';
import { TodoDispatchContext } from '../App';
import '../scss/todoItems.scss';
import { Button, EditPopupWrap } from './StyledComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TodoItems({id, content, isDone, time, day}) {
  const {onUpdate, onDelete} = useContext(TodoDispatchContext);
  const [text, setText] = useState(content);
  const [todoTime, setTodoTime] = useState(time);
  const [allDay, setAllDay] = useState(time === 'ALL DAY' ? true : false);
  const [edit, setEdit] = useState(false);

  // 시간 변경
  const onChangeTime = (e) => {
    setTodoTime(e.target.value);
  };

  // all day 변경
  const onToggleAllDay = () => {
    setAllDay(!allDay);
  };

  // 수정 팝업 띄우기
  const onEdit = () => {
    setEdit(true);
  }
  // 수정 팝업 닫기
  const onEditClose = () => {
    setEdit(false);
    setText(content);
    setTodoTime(time);
  }

  // 수정 완료 버튼
  const onEditSubmit = () => {
    setEdit(false);
    setText(text);
    setTodoTime(allDay === true ? 'ALL DAY' : todoTime);
  };

  // todo 변경
  const textChange = (e) => {
    setText(e.target.value);
  };

  // 체크박스(todo 완료 여부)
  const onChangeCheckbox = () => {
    onUpdate(id, day);
  };
  // 삭제
  const onClickDelete = () => {
    onDelete(id, day);
  };
  
  return (
    <>
      {/* 리스트 목록 */}
      <div className='todo-items'>
        <div className="checkbox_col">
          <input id={`${day}-${id}`} className='done-check' type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
          <label htmlFor={`${day}-${id}`} className='title-label'>{text}</label>
          <div className="time_col">{allDay ? "ALL DAY" : todoTime}</div>
          <Button onClick={onEdit}>수정</Button>
          <Button onClick={onClickDelete}>삭제</Button>
        </div>
      </div>

      {/* 수정 팝업 띄우기 */}
      <EditPopupWrap $edit={edit}>
        <div className="edit-popup">
          <div className='modify-title'>
            <h3>TODO 수정하기</h3>
            <button className='todo-btn' onClick={onEditClose}>
              <span>
                <FontAwesomeIcon icon={faTimes} className='icon' />
              </span>
            </button>
          </div>
          {/* todo 수정 */}
          <div className="modify-todo">
            <input id={`${day}-modify-todo-${id}`} className='title_col input' type="text" value={text} onChange={(e) => textChange(e)} required="" />
            <label htmlFor={`${day}-modify-todo-${id}`}>MODIFY TODO</label>
            <div className="underline"></div>
          </div>
          {/* time 수정 */}
          <div className="modify-time">
            <div className="modifiy-time-item">
              <input id={`${day}-modify-time-${id}`} className='modifiy-time_col' type="time" value={todoTime} disabled={allDay} onChange={(e) => onChangeTime(e)} required="" />
              <label htmlFor={`${day}-modify-time-${id}`}>MODIFY TIME</label>
              <div className="underline"></div>
            </div>
            {/* all day */}
            <div className="modify-time-check">
              <div className="modify-time-box">
                <label htmlFor={`${day}-modify-allday-${id}`} className='modify-allday-label'>
                  <input id={`${day}-modify-allday-${id}`} className='allday' type="checkbox" onChange={onToggleAllDay} checked={allDay} />
                  <span className="checkmark"></span>
                </label>
              </div>
              <label htmlFor={`${day}-modify-allday-${id}`} className='allday-label'>
                ALL DAY
              </label>
            </div>
          </div>
          {/* 수정 완료 버튼 */}
          <div className="modify-btn">
            <Button onClick={onEditSubmit}>수정완료</Button>
          </div>
        </div>
      </EditPopupWrap>
    </>
  )
};

export default TodoItems;
import React, { useContext, useMemo, useState } from 'react';
import TodoItems from './TodoItems';
import { TodoStateContext } from '../App';
import TodoEditer from './TodoEditer';
import { ListEdit, ListItems } from './StyledComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../scss/todoList.scss';

function TodoList({day}) {
  const {todo} = useContext(TodoStateContext);

  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // todo editer 토글
  const onNewTodoToggle = () => {
    setIsOpen(!isOpen);
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      notDoneCount
    };
  }, [todo]);

  const {notDoneCount} = analyzeTodo;

  // todo 정렬 (시간 -> all day)
  const sortedTodoState = useMemo(() => {
    return (
      todo
        ? todo.slice().sort((a, b) => {
            if (a.time === 'ALL DAY' && b.time === 'ALL DAY') {
              return 0;
            } else if (a.time === 'ALL DAY') {
              return 1;
            } else if (b.time === 'ALL DAY') {
              return -1;
            } else {
              return a.time.localeCompare(b.time);
            }
          })
        : []
    );
  }, [todo]);

  const getSearchResult = () => {
    const searchTodos = search === "" ? todo : todo.filter(it => it.content.toLowerCase().includes(search));

    return sortedTodoState.filter(it => searchTodos.includes(it));
  };

  

  return (
    <>
      <div className='list-wrapper'>
        {/* 리스트 출력 */}
        <ListItems className='list-items'>
          {getSearchResult().map(it => {
            return <TodoItems key={it.id} {...it} day={day} />
          })}
        </ListItems>
        <div className="list-option">
          {/* 검색 */}
          <input type="text" className='search-bar' value={search} onChange={onChangeSearch} placeholder='검색어를 입력하세요!' />
          {/* todo 개수와 새로운 todo 입력폼 토글 */}
          <ListEdit>
            <p className='total-count'><span>{notDoneCount}</span> TASKS</p>
            <button className='todo-btn' onClick={onNewTodoToggle}>
              <span>
                <FontAwesomeIcon icon={isOpen? faTimes : faPlus} className='icon' />
              </span>
            </button>
          </ListEdit>
        </div>
      </div>
      {/* 새로운 todo 입력폼 */}
      <div className='add-new'>
        <TodoEditer isOpen={isOpen} day={day} />
      </div>
    </>
  )
};

export default TodoList;
import React, { useContext, useMemo, useState } from 'react';
import TodoItems from './TodoItems';
import { TodoStateContext } from '../App';
import TodoEditer from './TodoEditer';


function TodoList() {
  const {todo} = useContext(TodoStateContext);

  const [search, setSearch] = useState('');
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

  const getSearchResult = () => {
    return search === "" ? todo : todo.filter(it => it.content.toLowerCase().includes(search));
  };

  return (
    <div className='todo-list'>
      <h3>TODO LIST</h3>
      <input type="text" className='search-bar' value={search} onChange={onChangeSearch} placeholder='검색어를 입력하세요!' />
      <div className='list-items'>
        {getSearchResult().map(it => {
          return <TodoItems key={it.id} {...it} />
        })}
      </div>
      <div className='list-edit'>
        <p className='total-count'>{notDoneCount} TASKS</p>
        <TodoEditer />
      </div>
    </div>
  )
};

export default TodoList;
import React, { useCallback, useMemo, useReducer, useRef } from 'react';
import Header from './components/Header';
import { Today, Tomorrow } from './components/Days';
import TodoList from './components/TodoList';
import './scss/common.scss';
import { Main, TodoListBox, TodoListBoxItem, TodoListWrap } from './components/StyledComponent';

// default data
const todoState = {
  today : [
    {
      id : 0,
      isDone : false,
      content : 'React 공부하기',
      time : '10:30'
    },
    {
      id : 1,
      isDone : false,
      content : 'javascript 공부하기',
      time : '11:30'
    },
    {
      id : 2,
      isDone : false,
      content : '빨래 널기',
      time : '07:30'
    },
    {
      id : 3,
      isDone : false,
      content : '이력서 쓰기',
      time : 'ALL DAY'
    }
  ],
  tomorrow : [
    {
      id : 0,
      isDone : false,
      content : '노래 연습하기',
      time : '10:00'
    },
    {
      id : 1,
      isDone : false,
      content : '공과금 내기',
      time : 'ALL DAY'
    },
    {
      id : 2,
      isDone : false,
      content : '1시간 운동하기',
      time : '14:00'
    },
    {
      id : 3,
      isDone : false,
      content : '저녁 장보기',
      time : '16:00'
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return {
        ...state,
        [action.day]: [action.newItem, ...state[action.day]],
      };
    case 'UPDATE':
      return {
        ...state,
        [action.day]: state[action.day].map((it) =>
          it.id === action.targetID ? { ...it, isDone: !it.isDone } : it
        ),
      };
    case 'DELETE':
      return {
        ...state,
        [action.day]: state[action.day].filter(
          (it) => it.id !== action.targetID
        ),
      };
    default:
      return state;
  }
};

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [todo, dispatch] = useReducer(reducer, todoState);
  const idRef = useRef(4);

  const onCreate = useCallback((content, time, day) => {
    dispatch({
      type : 'CREATE',
      newItem : {
        id: idRef.current,
        content,
        isDone : false,
        time : time
      },
      day
    })
    idRef.current += 1;
  }, []);

  const onUpdate = useCallback((targetID, day) => {
    dispatch({
      type : 'UPDATE',
      targetID,
      day
    })
  }, []);
  
  const onDelete = useCallback((targetID, day) => {
    dispatch({
      type : 'DELETE',
      targetID,
      day
    })
  }, []);

  const memoizedDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete}
  }, [onCreate, onUpdate, onDelete]);

  return (
    <div className="App">
      <div className="inner">
        <Header />
        <Main>
          {/* today */}
          <TodoListWrap>
            <TodoListBox>
              <Today />
              <TodoStateContext.Provider value={{todo : todo.today}}>
                <TodoDispatchContext.Provider value={memoizedDispatches}>
                  <TodoListBoxItem>
                    <TodoList day='today' />
                  </TodoListBoxItem>
                </TodoDispatchContext.Provider>
              </TodoStateContext.Provider>
            </TodoListBox>
          </TodoListWrap>

          {/* tomorrow */}
          <TodoListWrap>
            <TodoListBox>
              <Tomorrow />
              <TodoStateContext.Provider value={{todo : todo.tomorrow}}>
                <TodoDispatchContext.Provider value={memoizedDispatches}>
                  <TodoListBoxItem>
                    <TodoList day='tomorrow' />
                  </TodoListBoxItem>
                </TodoDispatchContext.Provider>
              </TodoStateContext.Provider>
            </TodoListBox>
          </TodoListWrap>
        </Main>
      </div>
    </div>
  );
}

export default App;

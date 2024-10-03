import React, { useState, useEffect } from 'react';
import LoadingBar from './components/LoadingBar';
import TodoItem from './components/TodoItem';

export type Todos = Todo[];
export interface Todo {
  id: string;
  order: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
export default function App() {
  const [todos, setTodos] = useState<Todos>([]);
  const [message, setMessage] = useState(''); // 타입 추론(inference) : ""
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      //! 이행
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          // method: 'GET', // 기본값, 생략 가능!!!
          headers: {
            'content-type': 'application/json',
            apikey: '5X8Z1k7M2vU5Q',
            username: 'Grepp_KDT4_ParkYoungWoong'
          }
        }
      );
      // const res = await fetch("../public/todo_list.json");

      const data = await res.json();
      console.log('응답 결과: ', data);
      setTodos(data);
    } catch (error) {
      //! 거부
      if (error instanceof Error) {
        const message = '에러가 발생했어요!';
        console.error('에러 발생: ', message);
        setMessage(message);
      } // 타입 가드
    } finally {
      //! 무조건 실행
      setLoading(false);
    }
  }

  function setTodo(updatedTodo: Todo) {
    console.log(123);
    setTodos(todos => {
      return todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  }

  function deleteTodo(todoToDelete: Todo) {
    setTodos(todos => todos.filter(todo => !(todo.id === todoToDelete.id))); // todos에서 삭제할 todo를 제외한 나머지 todos를 반환)
  }

  return (
    <>
      <div>{loading && <LoadingBar />}</div>
      <div>{message}</div>
      <ul>
        {todos.map(todo => (
          <React.Fragment key={todo.id}>
            <TodoItem
              todoItem={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
            />
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

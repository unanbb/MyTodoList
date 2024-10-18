import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; //하위 페이지를 어디에 출력할지 배치하는 컴포넌트
import LoadingBar from '@/components/LoadingBar';
import TodoItem from '@/components/TodoItem';
import TodoCreator from '@/components/TodoCreator';

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

  //? 데이터 목록 가져오기
  async function getTodos() {
    try {
      //! 이행
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
        // method: 'GET', // 기본값, 생략 가능!!!
        headers: {
          'content-type': 'application/json',
          apikey: 'W7G4K9J2BDFE1',
          username: 'FE1_LeeYunHwan'
        }
      });
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

  //? 개별 데이터 업데이트
  function setTodo(updatedTodo: Todo) {
    console.log(123);
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      });
    });
  }

  //? 개별 데이터 삭제
  function deleteTodo(todoToDelete: Todo) {
    setTodos((todos) => todos.filter((todo) => !(todo.id === todoToDelete.id))); // todos에서 삭제할 todo를 제외한 나머지 todos를 반환)
  }

  return (
    <>
      <TodoCreator getTodos={getTodos} />
      <div>{loading && <LoadingBar />}</div>
      <div>{message}</div>
      <ul>
        {todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <TodoItem
              todoItem={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
            />
          </React.Fragment>
        ))}
      </ul>
      <Outlet />
    </>
  );
}

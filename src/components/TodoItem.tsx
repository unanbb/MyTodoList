import { useState } from "react";
import { Todo } from "../App";

export default function TodoItem({ 
  todoItem, 
  getTodos 
}: { 
  todoItem: Todo; 
  getTodos:() => void; // getTodos가 매개변수가 없고, return값도 없음. 
}) {
  const [title, setTitle] = useState(todoItem.title); // name으로 각 input창 초기화
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    updateTodo(todoItem, title);
  }

  async function updateTodo(todoItem: Todo, title: string) { //코드 추상화 : 함수 이름만으로 무슨 로직인지 쉽게 알 수 있도록
    console.log('서버로 전송!', title);
    
    const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoItem.id}`,{ // 이 데이터의 id부분을 수정하려해.
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        apikey: '5X8Z1k7M2vU5Q',
        username: 'Grepp_KDT4_ParkYoungWoong',
      },
      body: JSON.stringify({
        title: title, // : title 생략가능! -> 속성과 값의 이름이 같아서
        done: todoItem.done,
      })
    });
    // 위에서 응답받은 데이터를 사용하기 위한 코드
    const data = await res.json(); // 데이터 분석
    console.log(data);

    getTodos();
  }

  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoItem.id}`,{ // 이 id를 가진 데이터를 삭제하려해.
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        apikey: '5X8Z1k7M2vU5Q',
        username: 'Grepp_KDT4_ParkYoungWoong',
      }
    }); //전송만 함. 응답은 받아도 쓸데가 없음.

    //삭제는 사용/분석할 데이터가 없음, fetch 이후 true/false값만 반환

    getTodos();
  }

  return (
    <li>
      <form onSubmit={handleSubmit}>
        {todoItem.title}
        <input value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <button type='submit'>수정</button>
        <button onClick={deleteTodo}>삭제</button>
      </form>
    </li>
  );
}


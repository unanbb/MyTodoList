import { useState } from 'react'
import { Todo } from '../App'

export default function TodoItem({
   todoItem,
    setTodo 
  }: { 
    todoItem: Todo;
    setTodo: (updatedTodo: Todo) => void;
  }) {
  const [title, setTitle] = useState(todoItem.title) // name으로 각 input창 초기화

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateTodo(todoItem, title)
  }

  async function updateTodo(todoItem: Todo, title: string) {
    //코드 추상화 : 함수 이름만으로 무슨 로직인지 쉽게 알 수 있도록
    
    //낙관적 업데이트
    setTodo({...todoItem, title})
    try{
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoItem.id}`,
        {
          // 이 데이터에서 해당id를 가진 데이터를 수정하려해.
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: '5X8Z1k7M2vU5Q',
            username: 'Grepp_KDT4_ParkYoungWoong'
          },
          body: JSON.stringify({
            title: title, // : 값 title 생략가능! -> 속성과 값의 이름이 같아서
            done: todoItem.done
          })
        }
      )

      const updatedTodo: Todo = await res.json() // 데이터 분석
      console.log(updatedTodo, title)
    } catch (error) {
      console.error(error);
      setTodo(todoItem);
    }
    
    // 위에서 응답받은 데이터를 사용하기 위한 코드
    
    
  }

  async function deleteTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoItem.id}`,
      {
        // 이 id를 가진 데이터를 삭제하려해.
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        }
      }
    ) //전송만 함. 응답은 받아도 쓸데가 없음.

    //삭제는 사용/분석할 데이터가 없음, fetch 이후 true/false값만 반환
  }

  return (
    <li>
      <form onSubmit={handleSubmit}>
        {todoItem.title}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">수정</button>
        <button onClick={deleteTodo}>삭제</button>
      </form>
    </li>
  )
}

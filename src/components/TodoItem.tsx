import { useState } from "react";
import { Todo } from "../App";

export default function TodoItem({ todoItem }: { todoItem: Todo }) {
  const [title, setTitle] = useState(todoItem.title); // name으로 각 input창 초기화

  function HandleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if(e.key =='Enter'){
      console.log('서버로 전송!', title);
      // await 서버(수정할이름)
    }
  }

  return (
    <li>
      {todoItem.title}
      <input value={title} onChange={(e)=> setTitle(e.target.value)} onKeyDown={HandleKeyDown}/>
    </li>
  );
}


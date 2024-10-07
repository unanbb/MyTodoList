// import React from 'react'
import { useState } from 'react';

export default function TodoCreator({ getTodos }: { getTodos: () => void }) {
  const [title, setTitle] = useState('');

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      console.log('title:', title);
      createTodo();
      setTitle('');
    }
  }

  async function createTodo() {
    await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`, {
      method: 'POST', //create
      headers: {
        'content-type': 'application/json',
        apikey: 'W7G4K9J2BDFE1', //5X8Z1k7M2vU5Q
        username: 'FE1_LeeYunHwan' //'Grepp_KDT4_ParkYoungWoong'
      },
      body: JSON.stringify({
        title: title // 이 title로 todo하나 만들어주세요~ "요청"
      })
    }); //! 여기까지가 데이터를 만들고, 서버에 삽입하는 과정
    // const newTodo: Todo = await res.json(); // 받아온 데이터 분석

    getTodos(); //! 목록 최신화 과정
  }
  return (
    <div>
      <input // 양방향 데이터바인딩(onChange 有), title이 value를 바꿀 수 있고, value가 title을 바꿀 수 있음.
        value={title}
        onChange={(e) => setTitle(e.target.value)} // e는 input을 가리킴
        onKeyDown={onKeyDown}
        placeholder="할 일을 작성하세요."
      />
    </div>
  );
}

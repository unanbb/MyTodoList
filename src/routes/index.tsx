import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/', //해당 페이지에서
    element: <h1>Hello React Router!</h1> //이 내용을 보여주겠다.
  } //무엇을 보여줄 지
]);

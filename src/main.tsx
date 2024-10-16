// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; //index.tsx는 생략 가능
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <RouterProvider router={router} />
);

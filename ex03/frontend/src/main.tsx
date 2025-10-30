import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import List from './pages/List.tsx';
import Welcome from './pages/Welcome.tsx';
import Add from './pages/Add.tsx';
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "welcome", element: <Welcome /> },
      { path: "list", element: <List /> },
      { path: "add", element: <Add /> },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { RouterProvider } from 'react-router-dom';
import { Router } from './router';
import './reset.css';
function App() {
  return (
    <div>
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}
export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './style/admin/global.scss';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ViewAllClass from './pages/teachers/ViewAllClass';
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vac" element={<ViewAllClass/>} />
        <Route path="/" element={<Login />}  />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;

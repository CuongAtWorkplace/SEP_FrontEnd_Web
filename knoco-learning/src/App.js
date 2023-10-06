import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './style/admin/global.scss';

import Home from './pages/admin/home/Home';
import Users from './pages/admin/users/Users';
import Report from './pages/admin/report/Report';
import Navbar from './components/admin/navbar/Navbar';
import Footer from './components/admin/footer/Footer';
import Menu from './components/admin/menu/Menu';
import User from './pages/admin/user/User';
import Index from './pages/users/homepage/index';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/r" element={<Register />} />
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

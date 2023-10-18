import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './style/admin/global.scss';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ViewAllClass from './pages/teachers/ViewAllClass';
import ClassDetail from './pages/teachers/ClassDetail';
import ListLearner from './pages/teachers/ListLearner';
import LearnerDetail from './pages/teachers/LearnerDetail';
import Users from './pages/admin/users/Users';
import Report from './pages/admin/report/Report';
import User from './pages/admin/user/User';
import Home from './pages/admin/home/Home';
import ViewAllCourse from './pages/manager/Course/ViewAllCourse';
import CourseDetail from './pages/manager/Course/CourseDetail';
import EditClass from './pages/teachers/EditClass';
import VideoCall from './pages/teachers/VideoCall';
import TestModal from './pages/manager/Course/TestModal';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/viewallclass" element={<ViewAllClass/>} />
        <Route path="/classdetail/:classId" element={<ClassDetail/>} />
        <Route path="/learnerdetail" element={<LearnerDetail/>} />
        <Route path="/listlearner" element={<ListLearner/>} />
        <Route path="/" element={<Login />}  />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/report" element={<Report />} />
        <Route path="/course" element={<ViewAllCourse />} />
        <Route path="/testmodal" element={<TestModal />} />
        <Route path="/coursedetail/:cid" element={<CourseDetail />} />

        <Route path="/editclass" element={<EditClass />} />
        <Route path="/videocall" element={<VideoCall />} />
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

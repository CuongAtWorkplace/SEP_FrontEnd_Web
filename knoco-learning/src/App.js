import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ClassDetail from './pages/teachers/ClassDetail';
import ListLearner from './pages/teachers/ListLearner';
import LearnerDetail from './pages/teachers/LearnerDetail';
import Users from './pages/admin/users/Users';
import Report from './pages/admin/report/Report';
import UserDetail from './pages/admin/user/UserDetail';
import Home from './pages/admin/home/Home';
import ViewAllCourse from './pages/manager/Course/ViewAllCourse';
import CourseDetail from './pages/manager/Course/CourseDetail';
import EditClass from './pages/teachers/EditClass';
import VideoCallDemo from './pages/teachers/VideoCallDemo';
import ViewListQuizzInClass from './pages/teachers/ViewListQuizzInClass';
import ViewNotificationTeacher from './pages/teachers/ViewNotificationTeacher';
import QuizzDetail from './pages/teachers/QuizzDetail';
import VideoCall2 from './pages/teachers/VideoCall2';
import ViewPostListManager from './pages/manager/ViewPostListManager';
import ViewPostDetailManager from './pages/manager/ViewPostDetailManager';
import Profile from './pages/teachers/Profile';
import ClassEmpty from './pages/teachers/ClassEmpty';
import ListAllCourse from './pages/teachers/ListAllCourse';
import GroupChat from './pages/teachers/GroupChat';
import ViewLeanerList from './pages/manager/Leaner/ViewLeanerList';
//import TestModal from './pages/manager/Course/TestModal';
import ListCourse from './components/manager/ListCourse';
import SideBar from './components/sidebar/SideBar';
import RequestManager from './components/request/RequestManager';
import HomePage from './pages/teachers/HomePage';
import RequestClassManager from './components/request/RequestClassManager';
import BoxChat from './components/chat/BoxChat';
import ViewClass from './pages/teachers/ViewClass';
import ViewAllClass from './components/admin/ViewAllClass';
import ViewAllPost from './components/admin/ViewAllPost';
import Payment from './pages/admin/report/Payment';
const queryClient = new QueryClient();


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* teacher */}
        <Route path="/" element={<Login />} />
        <Route path="/viewclass" element={<ViewClass />} />
        <Route path="/classdetail/:classId" element={<ClassDetail />} />
        <Route path="/learnerdetail" element={<LearnerDetail />} />
        <Route path="/list-all-course" element={<ListAllCourse />} />
        <Route path="/choose-class/:courseId" element={<ClassEmpty />} />
        <Route path="/profile-teacher" element={<Profile />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/videocall/:roomId" element={<VideoCallDemo />} />
        <Route path="/chat/:ClassId" element={<GroupChat />} />
        <Route path="/editclass" element={<EditClass />} />
        {/* admin */}
        <Route path="/viewallclass" element={<ViewAllClass />} />
        <Route path="/viewallpost" element={<ViewAllPost />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/report" element={<Report />} />
        <Route path="/payment" element={<Payment />} />
        {/* manager */}
        <Route path="/boxchat/:boxchatid" element={<BoxChat />} />
        <Route path='/tableRequestmanager' element={<RequestManager />} />
        <Route path='/tableRequesClassManager' element={<RequestClassManager />} />
        <Route path="/manager/course" element={<ViewAllCourse />} />
        <Route path="/coursedetail/:cid" element={<CourseDetail />} />
        <Route path="/course" element={<ViewAllCourse />} />
        <Route path="/manager/viewpostlistmanager" element={<ViewPostListManager />} />
        <Route path="/manager/viewpostdetailmanager/:pid" element={<ViewPostDetailManager />} />

        <Route path="/listlearner" element={<ListLearner />} />
        <Route path="/viewleanerlist" element={<ViewLeanerList />} />
        <Route path='/testfile' element={<ListCourse />} />
        <Route path='/manager' element={<SideBar />} />
        
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

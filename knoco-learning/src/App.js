import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './pages/login/Login';
import Register from './pages/login/Register';
import ViewAllClass from './pages/teachers/ViewAllClass';
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
const queryClient = new QueryClient();


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* admin */}

        {/* manager */}

        {/* teacher */}
        <Route path="/" element={<Login />} />
        <Route path="/viewclass" element={<ViewAllClass/>} />
        <Route path="/classdetail/:classId" element={<ClassDetail/>} />
        <Route path="/learnerdetail" element={<LearnerDetail/>} />
        <Route path="/list-all-course" element={<ListAllCourse />} />
        <Route path="/class-empty/:courseId" element={<ClassEmpty />} />
        
        <Route path="/profile-teacher" element={<Profile />} />
        
        <Route path="/listlearner" element={<ListLearner/>} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/report" element={<Report />} />
        <Route path="/manager/course" element={<ViewAllCourse />} />
        <Route path="/viewleanerlist" element={<ViewLeanerList />} />
        <Route path="/coursedetail/:cid" element={<CourseDetail />} />
        <Route path="/editclass" element={<EditClass />} />
        <Route path='/listquizzinclass' element={<ViewListQuizzInClass />} />
        <Route path='/notificationteacher' element={<ViewNotificationTeacher />} />
        <Route path='/quizzdetail' element={<QuizzDetail />} />
        <Route path="/videocalldemo/:roomId" element={<VideoCallDemo />} />
        <Route path="/manager/viewpostlistmanager" element={<ViewPostListManager />} />
        <Route path="/viewpostdetailmanager/:pid" element={<ViewPostDetailManager />} />
        <Route path="/chat/:gid" element={<GroupChat />} />
        <Route path='/testfile' element={<ListCourse />} />
        <Route path='/manager' element={<SideBar />} />
        <Route path='/tableRequestmanager' element={<RequestManager/>} />
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

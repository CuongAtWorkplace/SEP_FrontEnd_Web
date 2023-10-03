import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashborad from './pages/admin/Dashborad';
import Account from './pages/admin/Account';
import About from './pages/admin/About';
import Report from './pages/admin/Report';
import Sidebar from './components/admin/Sidebar'


const App = () => {
    return (
        <div>
        <BrowserRouter>
            <Sidebar>
            <Routes>
                <Route path="/"element={<Dashborad/>}></Route>
                <Route path="/dashboard"element={<Dashborad/>}></Route>
                <Route path="/account"element={<Account/>}></Route>
                <Route path="/report"element={<Report/>}></Route>
                <Route path="/about"element={<About/>}></Route>
            </Routes>
            </Sidebar>
        </BrowserRouter>
        </div>
    );
};

export default App;
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/users/homepage";
import { ROUTERS } from "./utils/router";
//import MasterLayout from "./pages/users/theme/masterLayout";
import ManagerLayout from "./pages/manager/managerLayout/managerLayout";
import Profile from "./pages/users/profile";
import ClassList from "./components/class-list";
import ClassEdit from "./components/class-edit";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <Homepage />,
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <Profile />,
        },
        {
            path: ROUTERS.TEACHER.CLASS,
            component: <ClassList />,
        },
        {
            path: ROUTERS.TEACHER.CLASSEDIT,
            component: <ClassEdit />,
        },
    ];

    return (
        <ManagerLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </ManagerLayout>

    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
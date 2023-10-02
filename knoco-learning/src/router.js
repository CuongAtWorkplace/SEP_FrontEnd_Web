import { Routes, Route } from "react-router-dom";
// import Homepage from "./pages/users/homepage";
import DashboardPage from "./pages/admin/Dashborad";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
// import Profile from "./pages/users/profile";

const renderUserRouter = () => {
    const userRouters = [
        // {
        //     path: ROUTERS.USER.HOME,
        //     component: <Homepage />,
        // },
        // {
        //     path: ROUTERS.USER.PROFILE,
        //     component: <Profile />,
        // },
        {
            path: ROUTERS.ADMIN.HOME,
            component: <DashboardPage />,
        },
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.component} />
                ))}
            </Routes>
        </MasterLayout>

    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;
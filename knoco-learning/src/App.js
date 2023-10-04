import Home from './pages/admin/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Users from './pages/admin/users/Users';
import Report from './pages/admin/report/Report';
import Navbar from './components/admin/navbar/Navbar';
import Footer from './components/admin/footer/Footer';
import Menu from './components/admin/menu/Menu';
import Login from './pages/admin/login/Login';
import User from './pages/admin/user/User';
import Index from './pages/users/homepage/index'
import './style/admin/global.scss';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "report",
          element: <Report />,
        },
        {
          path: "homepage",
          element: <Index />,
        },
      ]
    },
    {
      path: "login",
      element: <Login />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

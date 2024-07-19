import { CheckAuthHandler, CheckPublicHandler } from "@/api/user/user";
import LoginPage from "@/pages/auth/login/login-page";
import RegisterPage from "@/pages/auth/register/register-page";
import DashboardPage from "@/pages/dashborad/dashboard-page";
import HomePage from "@/pages/home/home-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      loader: CheckPublicHandler,
    },
    {
      path: "login",
      element: <LoginPage />,
      loader: CheckPublicHandler,
    },
    {
      path: "register",
      element: <RegisterPage />,
      loader: CheckPublicHandler,
    },
    {
      path: "dashboard",
      element: <DashboardPage />,
      loader: CheckAuthHandler,
    },
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default Routes;

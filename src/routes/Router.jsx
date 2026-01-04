import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllReviews from "../pages/Home/AllReviews";
import ProtectedRoute from "./ProtectedRoute";
import AddReview from "../pages/Dashboards/AddReview";
import MyReviews from "../pages/Dashboards/MyReviews";
import EditReview from "../pages/Dashboards/EditReview";
import MyFavorites from "../pages/Dashboards/MyFavorites";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import About from "../pages/extra/About";
import Contact from "../pages/extra/Contact";
import Blog from "../pages/extra/Blog";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/Dashboards/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "allReviews", element: <AllReviews /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-review", element: <AddReview /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "edit/:id", element: <EditReview /> },
      { path: "my-favorites", element: <MyFavorites /> },
    ],
  },
]);

export default router;


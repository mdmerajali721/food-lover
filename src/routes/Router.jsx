import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AllReviews from "../pages/AllReviews";
import ProtectedRoute from "./ProtectedRoute";
import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import EditReview from "../pages/EditReview";
import MyFavorites from "../pages/MyFavorites";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/allReviews", element: <AllReviews /> },

      // Protected Routes
      {
        path: "/add-review",
        element: (
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <EditReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <ProtectedRoute>
            <MyFavorites />
          </ProtectedRoute>
        ),
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);

export default router;

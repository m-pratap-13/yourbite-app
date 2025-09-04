import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SellerSignUpPage from "./pages/SellerSignUpPage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import FoodShop from "./components/Home/FoodShop.jsx";
import FoodItem from "./components/Home/FoodItem.jsx";
import AddToCartPage from "./pages/AddToCartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SingleFoodPage from "./pages/SingleFoodPage.jsx";
import SellerDashboardPage from "./pages/SellerDashboardPage.jsx";
import ManageProductsPage from "./pages/ManageProductsPage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import AdminReviewPage from "./pages/admin/AdminReviewPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/shops",
            element: <FoodShop />,
          },
          {
            path: "/",
            element: <FoodItem />,
          },
          {
            path: "/addtocart",
            element: <AddToCartPage />,
          },
          {
            path: "/seller/add-product",
            element: <ProductListingPage />,
          },
          {
            path: "/category/:categoryName",
            element: <CategoryPage />,
          },
          {
            path: "/food/:foodId/:foodName",
            element: <SingleFoodPage />,
          },
          {
            path: "/seller/dashboard",
            element: <SellerDashboardPage />,
          },
          {
            path: "/seller/products/:pageType",
            element: <ManageProductsPage />,
          },
          {
            path: "/update/foodId/:foodId",
            element: <UpdatePage />,
          },
          {
            path: "/admin/:pageType",
            element: <AdminReviewPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/customer-registration",
        element: <SignUpPage />,
      },
      {
        path: "/seller-registration",
        element: <SellerSignUpPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

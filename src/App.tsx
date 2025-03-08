import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss"
import Users from "./pages/users/Users";
import Product from "./components/product/Product";
import User from "./components/user/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Metrics from "./pages/metrics/metrics";

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
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path:"/metrics",
          element:<Metrics/>
        },
        {
          path: "/products",
          element: <Products />
        },
        {
          path: "/users/:id",
          element: <User />
        },
        {
          path: "/products/:id",
          element: <Product />
        }
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
  ]);
  return <RouterProvider router={router} />
}

export default App

import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

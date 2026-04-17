import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CartContextProvider from "./context/cart-context.tsx";

createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>,
);

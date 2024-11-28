import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { EstimateProvider } from "./contexts/estimateContext.tsx";
import { ConfirmProvider } from "./contexts/confirmContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EstimateProvider>
      <ConfirmProvider>
        <ToastContainer />
        <App />
      </ConfirmProvider>
    </EstimateProvider>
  </StrictMode>
);

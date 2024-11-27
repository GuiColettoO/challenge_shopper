import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { EstimateProvider } from "./contexts/estimateContext.tsx";
import { ConfirmProvider } from "./contexts/confirmContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EstimateProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </EstimateProvider>
  </StrictMode>
);

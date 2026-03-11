import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App.jsx";

const config = {
  ripple: true,
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrimeReactProvider config={config}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
);

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider, ResourceProvider } from "./globalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CategoryProvider>
      <ResourceProvider>
        <App />
      </ResourceProvider>
    </CategoryProvider>
  </BrowserRouter>
);

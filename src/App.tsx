import { Route, Routes } from "react-router-dom";
import "./App.css";
import BrainCrumbs from "./pages/home";
import DisplayResources from "./pages/resources";
import Sidebar from "./components/sidenav";
import ErrorBoundary from "./errorboundary";

function App() {
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar on the left */}
        <div className="text-white">
          <Sidebar />
        </div>

        {/* Content on the right */}
        <div className="flex-1 overflow-y-auto">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<BrainCrumbs />} />
              <Route
                path="/resources/:id/:category"
                element={<DisplayResources />}
              />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

export default App;

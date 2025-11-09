import { Route, Routes } from "react-router-dom";
import "./App.css";
import BrainCrumbs from "./pages/home";
import DisplayResources from "./pages/resources";
// import ErrorBoundary from "./errorboundary";
import SharedResource from "./pages/share";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import { ProtectedRoute } from "./protectedRoute";
import Sidebar from "./components/sidenav";
import { useUser } from "./hooks/useUser";
// console.log(user);

function App() {
  const { user, loading } = useUser();
  if (loading) return <p>Loading...</p>; // prevents flicker on refresh
  // console.log("user:", user);

  return (
    <>
      <div className="flex h-screen">
        {user && <Sidebar />}

        {/* Content on the right */}
        <div className="flex-1 overflow-y-auto">
          {/* <ErrorBoundary> */}
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <BrainCrumbs />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/signin" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route
              path="/resources/:id/:category"
              element={
                <ProtectedRoute user={user}>
                  <DisplayResources />
                </ProtectedRoute>
              }
            />
            <Route path="/share/:id" element={<SharedResource />} />
          </Routes>
          {/* </ErrorBoundary> */}
        </div>
      </div>
    </>
  );
}

export default App;

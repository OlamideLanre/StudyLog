import { Route, Routes } from "react-router-dom";
import "./App.css";
import BrainCrumbs from "./pages/home";
import DisplayResources from "./pages/resources";
// import ErrorBoundary from "./errorboundary";
import SharedResource from "./pages/share";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import { ProtectedRoute } from "./protectedRoute";
import { user } from "./hooks/getUser";
console.log(user);

function App() {
  return (
    <>
      <div className=" h-screen">
        {/* Content on the right */}

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
            element={<DisplayResources />}
          />
          <Route path="/share/:id" element={<SharedResource />} />
        </Routes>
        {/* </ErrorBoundary> */}
      </div>
    </>
  );
}

export default App;

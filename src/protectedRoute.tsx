import type { AuthUser } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: AuthUser | null;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  return user ? children : <Navigate to="/auth/signin" replace />;
};

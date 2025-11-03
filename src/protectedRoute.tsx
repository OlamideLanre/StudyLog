import type { AuthUser } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  user: AuthUser | null;
  children: React.ReactNode;
};

export const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

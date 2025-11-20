import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
};

// Private Route component to be used currently only in main.tsx
// Wraps react children around, and does the following through the auth context:
// User is authenticated. Allow the react children to be rendered.
// User is not authenticated. Redirect the user to the login page, using Navigate.

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
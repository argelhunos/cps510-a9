import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
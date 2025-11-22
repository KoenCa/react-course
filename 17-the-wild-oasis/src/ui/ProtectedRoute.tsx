import { useEffect, type ReactNode } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
`;

/**
 * Routes requiring authentication should be wrapped by this route.
 * It fetches current user and determines if it is authenticated.
 *  - Unauthenticated: navigate to login page
 *  - Authenticated: render the page
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { isFetchingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isFetchingUser) navigate("/login");
  }, [isAuthenticated, isFetchingUser, navigate]);

  if (isFetchingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;

  return null;
};

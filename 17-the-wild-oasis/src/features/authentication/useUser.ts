import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/api/apiAuth";

/**
 * Gets current user via API when not already fetched and cached. After login we set the receiver user object in the react
 * query cache so that we don't have to do an extra API call to fetch it again. This also prevent race conditions that
 * could cause the protected route to redirect the user right back to the login page after logging in.
 */
export const useUser = () => {
  const { data: user, isLoading: isFetchingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isFetchingUser,
    isAuthenticated: user?.role === "authenticated",
  };
};

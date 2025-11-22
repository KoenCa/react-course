import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login as apiLogin,
  type ApiLoginCredentials,
} from "../../services/api/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: ApiLoginCredentials) =>
      apiLogin({ email, password }),
    onSuccess: ({ user }) => {
      // Store the receiver user object into the react query cache so that it can be used by the useUser hook to immediately
      // get it from cache and use it in the protected route to determine user authentication.
      queryClient.setQueryData(["user"], user);

      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoggingIn };
};

import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/api/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        `Account successfully created! Please verify the new account from the user's email address`,
      );
    },
  });

  return {
    signUp,
    isSigningUp,
  };
};

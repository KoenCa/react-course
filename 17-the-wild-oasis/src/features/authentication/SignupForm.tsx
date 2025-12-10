import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { useSignUp } from "./useSignUp";

// Email regex: /\S+@\S+\.\S+/

export const SignUpForm = () => {
  const { signUp, isSigningUp } = useSignUp();

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<{
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>({ disabled: isSigningUp });

  const handleFormSubmit = handleSubmit(
    async ({ fullName, email, password }) => {
      signUp(
        { fullName, email, password },
        {
          onSettled: () => {
            reset();
          },
        },
      );
    },
  );

  const handleFormReset = () => reset()

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={handleFormReset}>
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
};

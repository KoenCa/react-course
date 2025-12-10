import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

export const UpdatePasswordForm = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();
  const { errors } = formState;

  const { updateUser, isUpdatingUser } = useUpdateUser();

  const handleFormSubmit = handleSubmit(({ password }) => {
    updateUser({ password }, { onSuccess: () => reset() });
  });

  const handleFormReset = () => reset();

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormRow
        label="New Password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdatingUser}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdatingUser}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleFormReset}>
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update password</Button>
      </FormRow>
    </Form>
  );
};

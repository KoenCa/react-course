import { supabase } from "../supabase/supabase";

export interface ApiLoginCredentials {
  email: string;
  password: string;
}

export const login = async ({ email, password }: ApiLoginCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

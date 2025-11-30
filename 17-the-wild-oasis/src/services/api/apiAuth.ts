import { supabase } from "../supabase/supabase";

interface ApiSignUpArgs {
  fullName: string
  email: string
  password: string
}

export interface ApiLoginCredentials {
  email: string;
  password: string;
}

export const signUp = async ({ fullName, email, password }: ApiSignUpArgs) => {
  const { data, error } =  await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

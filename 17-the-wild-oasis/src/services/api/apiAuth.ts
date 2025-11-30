import { AVATARS_BUCKET_NAME, supabase } from "../supabase/supabase";

interface ApiSignUpArgs {
  fullName: string;
  email: string;
  password: string;
}

export interface ApiLoginCredentials {
  email: string;
  password: string;
}

export const signUp = async ({ fullName, email, password }: ApiSignUpArgs) => {
  const { data, error } = await supabase.auth.signUp({
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

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) => {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  // 1. Update password OR fullName
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from(AVATARS_BUCKET_NAME)
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. Update avatar in the user
  const uploadedImageUrl = supabase.storage
    .from(AVATARS_BUCKET_NAME)
    .getPublicUrl(fileName).data.publicUrl;

  const { data: userWithAvatar, error: updateUserWithAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: uploadedImageUrl,
      },
    });

  if (updateUserWithAvatarError) {
    throw new Error(updateUserWithAvatarError.message);
  }

  return userWithAvatar;
};

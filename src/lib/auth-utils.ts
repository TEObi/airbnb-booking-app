import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export async function signIn(email: string, password: string) {
  return nextAuthSignIn("credentials", {
    email,
    password,
    redirect: false,
  });
}

export async function signInWithGoogle() {
  return nextAuthSignIn("google", {
    redirect: true,
    redirectTo: "/",
  });
}

export async function signOut() {
  return nextAuthSignOut({
    redirect: true,
    redirectTo: "/",
  });
}

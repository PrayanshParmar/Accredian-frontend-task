import { RegisterUser, LoginUser } from "@/lib/https";
import { UserError, UserSuccess } from "@/lib/res_types";
import { redirect } from "react-router-dom";

// User ========================================

// POST ==================================

export const RegisterUserHandler = async (RegisterUser: RegisterUser) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(RegisterUser),
    }
  );
  if (!response.ok) {
    const errorData: UserError = await response.json();
    throw new Error(errorData.error);
  }

  const resData = await response.json();
  return resData;
};

export const LoginUserHandler = async (LoginUser: LoginUser) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(LoginUser),
    }
  );

  if (!response.ok) {
    const errorData: UserError = await response.json();
    throw new Error(errorData.error);
  }

  const resData = await response.json();
  return resData;
};

export const LogoutHandler = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (response.ok) {
    const resData: UserSuccess = await response.json();
    return resData;
  } else {
    return null;
  }
};

// GET =========================================

export const CheckAuthHandler = async () => {
  const verifyToken = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-token`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (verifyToken.status === 400) {
    return redirect("/login");
  }

  if (verifyToken.status === 500) {
    return redirect("/login");
  }

  return null;
};

export const CheckPublicHandler = async () => {
  const verifyToken = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-token`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (verifyToken.status === 200) {
    return redirect("/dashboard");
  }

  return null;
};

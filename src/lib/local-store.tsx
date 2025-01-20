import AuthType from "@/types/auth-type";

const LocalStore = (user: AuthType, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  return;
};

export default LocalStore;

import AuthType from "@/types/auth-type";

const LocalStore = (user: AuthType, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  return;
};

const LocalStoreLikes = (likes: number) => {
  localStorage.setItem("likes", likes.toString());
  return;
};

const LocalStoreClear = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("likes");
  localStorage.removeItem("expireIn");
  return;
};

const LocalStoreExpireIn = (h: string) => {
  localStorage.setItem("expiresIn", h);
};
export default LocalStore;
export { LocalStoreLikes, LocalStoreClear, LocalStoreExpireIn };

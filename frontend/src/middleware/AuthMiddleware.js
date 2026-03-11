import SecureStorage from "@/helpers/SecureStorage";
import { redirect } from "react-router";
import { AuthContext } from "./AuthContext";

const authMiddleware = ({ context }) => {
  console.log("AuthMiddleware triggered");
  console.log(context);
  const user = SecureStorage.getStorage("user");
  console.log("User from SecureStorage:", user);
  if (!user) {
    throw redirect("/login");
  }
  context.set(AuthContext, user);
};

export const redirectMiddleware = ({ context }) => {
  console.log("RedirectMiddleware triggered");

  const user = SecureStorage.getStorage("user");
  if (user) {
    context.set(AuthContext, user);
    throw redirect("/app");
  }
};

export default authMiddleware;

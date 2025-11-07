import { api } from "./taskService";


export const register = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const login = async (name, password) => {
  const res = await api.post("/auth/login", { name, password });
  //  Save token in localStorage after successful login
  localStorage.setItem("token", res.data.token);
  return res;
};

export const logout = () => {
  localStorage.removeItem("token");
};

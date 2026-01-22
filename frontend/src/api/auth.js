import { api } from "./client";

export const signup = (payload) =>
  api("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const login = (payload) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

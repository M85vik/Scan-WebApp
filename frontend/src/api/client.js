const BASE_URL = "http://localhost:5000/api";

export const api = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
};

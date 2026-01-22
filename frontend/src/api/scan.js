import { BASE_URL } from "./client";

export const scanImages = async (files) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await fetch(`${BASE_URL}/scan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Scan failed");

  return data;
};

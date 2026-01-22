const BASE_URL = "http://localhost:5000/api";

export const getHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch history");

  return data;
};

export const getScanById = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch scan");

  return data;
};

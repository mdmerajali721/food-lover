const API_URL = import.meta.env.VITE_API_URL;

export const getAllReviews = async (search = "", page = 1, limit = 6) => {
  const res = await fetch(`${API_URL}/allReviews?search=${search}&page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

export const getTopReviews = async () => {
  const res = await fetch(`${API_URL}/allReviews/top`);
  if (!res.ok) throw new Error("Failed to fetch top reviews");
  return res.json();
};

export const addReview = async (reviewData) => {
  const res = await fetch(`${API_URL}/allReviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error("Failed to add review");
  return res.json();
};

export const addFavorite = async (favoriteData) => {
  const res = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(favoriteData),
  });
  if (!res.ok) throw new Error("Failed to add favorite");
  return res.json();
};

export const getFavorites = async (email) => {
  const res = await fetch(`${API_URL}/favorites/${email}`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return res.json();
};

export const deleteFavorite = async (id) => {
  const res = await fetch(`${API_URL}/favorites/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete favorite");
  return res.json();
};

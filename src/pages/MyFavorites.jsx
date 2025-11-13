import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";

const MyFavorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteFavId, setDeleteFavId] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to see your favorites.");
      navigate("/login");
      return;
    }
    fetchFavorites();
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${user.email}`);
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data = await res.json();
      setFavorites(data || []);
    } catch (err) {
      console.error(err);
      setFavorites([]);
      toast.error("Unable to load favorites.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFavorite = async () => {
    if (!deleteFavId) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/favorites/${deleteFavId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete favorite");
      toast.success("Favorite removed!");
      setDeleteFavId(null);
      fetchFavorites();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favorite");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorite reviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Food Name</th>
                <th className="p-2 border">Restaurant</th>
                <th className="p-2 border">Added By</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav) => {
                const review = fav.review || {};
                return (
                  <tr key={fav._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">
                      <img
                        src={review.foodImage || "https://i.ibb.co/KzfQRnwL/avatar.png"}
                        alt={review.foodName}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="p-2 border">{review.foodName || "N/A"}</td>
                    <td className="p-2 border">{review.restaurantName || "N/A"}</td>
                    <td className="p-2 border">
                      {review.userName || review.userEmail || "Unknown"}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => setDeleteFavId(fav._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {deleteFavId && (
        <Modal onClose={() => setDeleteFavId(null)}>
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Remove</h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to remove this favorite?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDeleteFavId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDeleteFavorite}
              >
                Confirm
              </button>              
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyFavorites;

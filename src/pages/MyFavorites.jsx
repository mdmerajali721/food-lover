import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal/Modal";
import { useNavigate } from "react-router";

const MyFavorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites/${user.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data = await res.json();
      setFavorites(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load favorites.");
      setFavorites([]);
    }
  };

  const handleDeleteFavorite = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites/${deleteFavId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Favorite removed!");
      setDeleteFavId(null);
      fetchFavorites();
    } catch {
      toast.error("Failed to remove favorite");
    }
  };

  const textStyle =
    "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

  return (
    <div className="mx-auto">
      <h1 className={textStyle}>My Favorite Reviews</h1>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="text-center p-10">
          <p className="text-gray-500 text-lg">
            You haven’t added any favorite reviews yet.
          </p>
        </div>
      ) : (
        <div className="bg-base-200 shadow-2xl rounded overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-600">
              <tr>
                <th className="px-8 py-4 text-start font-semibold tracking-wide">
                  Food
                </th>
                <th className="px-6 py-4 text-center font-semibold tracking-wide">
                  Restaurant
                </th>
                <th className="px-6 py-4 text-center font-semibold tracking-wide">
                  Added By
                </th>
                <th className="px-6 py-4 text-center font-semibold tracking-wide">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {favorites.map((fav) => {
                const review = fav.review || {};
                return (
                  <tr
                    key={fav._id}
                    className="border-t border-green-500 hover:bg-base-100 transition-all duration-200"
                  >
                    {/* Food */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-start gap-3">
                        <img
                          src={review.foodImage}
                          alt={review.foodName}
                          className="w-12 h-12 rounded-xl object-cover shadow-md"
                        />
                        <span className="font-semibold text-gray-600 text-sm">
                          {review.foodName || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Restaurant */}
                    <td className="px-6 py-4 text-center font-medium text-gray-500">
                      {review.restaurantName || "N/A"}
                    </td>

                    {/* User */}
                    <td className="px-6 py-4 text-center text-gray-500">
                      {review.userName || "Unknown"}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setDeleteFavId(fav._id)}
                        className="px-5 py-2 rounded bg-red-100 text-red-600 font-semibold
                           hover:bg-red-500 hover:text-white transition-all duration-200"
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

      {/* Confirmation Modal */}
      {deleteFavId && (
        <Modal onClose={() => setDeleteFavId(null)}>
          <div className="p-6 text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">
              Remove Favorite?
            </h2>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteFavId(null)}
                className="px-5 py-2 rounded font-bold bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFavorite}
                className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:from-red-600 hover:to-red-700 transition"
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

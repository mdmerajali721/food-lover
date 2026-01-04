import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const EditReview = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    restaurantName: "",
    restaurantLocation: "",
    foodImage: "",
    reviewText: "",
    rating: "",
  });

  // Fetch review data
  useEffect(() => {
    if (!user) {
      toast.error("Please log in first!");
      navigate("/login");
      return;
    }

    const fetchReview = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch review");
        const data = await res.json();

        setFormData({
          foodName: data.foodName || "",
          restaurantName: data.restaurantName || "",
          restaurantLocation: data.restaurantLocation || "",
          foodImage: data.foodImage || "",
          reviewText: data.reviewText || "",
          rating: data.rating?.toString() || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load review!");
      }
    };

    fetchReview();
  }, [id, user, navigate]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { foodName, restaurantName, reviewText, rating } = formData;

    if (!foodName || !restaurantName || !reviewText || !rating) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: Number(rating),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Review updated successfully!");
      navigate("/my-reviews");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // Styles
  const textStyle =
    "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

  const buttonStyle =
    "w-full py-3 rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-base-200 shadow-2xl rounded">
      <h2 className={textStyle}>Edit Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Food Name
          </label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Restaurant Location
          </label>
          <input
            type="text"
            name="restaurantLocation"
            value={formData.restaurantLocation}
            onChange={handleChange}
            placeholder="Enter restaurant location"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Food Image URL
          </label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Description
          </label>
          <textarea
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            rows="4"
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate("/my-reviews")}
            className="w-full py-3 rounded font-bold bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button type="submit" className={buttonStyle}>
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;

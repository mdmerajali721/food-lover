import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const EditReview = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    foodName: "",
    restaurantName: "",
    restaurantLocation: "",
    foodImage: "",
    reviewText: "",
    rating: "",
  });

  // Fetch review by ID and autofill form
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to edit your review!");
      navigate("/login");
      return;
    }

    const fetchReview = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
        if (!res.ok) throw new Error("Failed to fetch review");
        const data = await res.json();

        // Autofill all fields with fetched data
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
        toast.error("Failed to load review data!");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id, user, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { foodName, restaurantName, reviewText, rating } = formData;

    if (!foodName || !restaurantName || !reviewText || !rating) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to update review");

      toast.success("Review updated successfully!");
      navigate("/my-reviews");
    } catch (error) {
      console.error(error);
      toast.error("Error updating review!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        Edit Review
      </h2>

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
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
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
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Restaurant Location */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Restaurant Location
          </label>
          <input
            type="text"
            name="restaurantLocation"
            value={formData.restaurantLocation}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="Enter restaurant location"
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Food Image URL
          </label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            placeholder="Paste image URL"
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
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
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
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/my-reviews")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReview;

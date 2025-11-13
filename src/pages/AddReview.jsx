import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "../components/Loader";

const AddReview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: "",
    restaurantName: "",
    restaurantLocation: "",
    foodImage: "",
    description: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a review!");
      return;
    }

    const { foodName, restaurantName, restaurantLocation, foodImage, description, rating } = formData;

    if (!foodName || !restaurantName || !description || !rating) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const reviewData = {
      foodName,
      restaurantName,
      restaurantLocation,
      foodImage: foodImage || "https://i.ibb.co/3yH89bHm/noImages.jpg",
      reviewText: description,
      rating: Number(rating),
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "https://i.ibb.co/KzfQRnwL/avatar.png",
      createdAt: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) throw new Error("Failed to add review");

      toast.success("Review added successfully!");
      navigate("/my-reviews");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // 💡 Full-page loader
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <Loader />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        Add a New Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            placeholder="Enter food name"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />
        </div>

        {/* Restaurant Location */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Restaurant Location</label>
          <input
            type="text"
            name="restaurantLocation"
            value={formData.restaurantLocation}
            onChange={handleChange}
            placeholder="Enter restaurant location"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Food Image URL */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Food Image URL</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your experience..."
            rows="4"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;

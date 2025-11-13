import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import HeroSlider from "../components/HeroSlider";
import TrendingRestaurants from "../components/TrendingRestaurants";
import PopularFoods from "../components/PopularFoods";
import ReviewCard from "../components/ReviewCard";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTopReviews();
  }, []);

  const fetchTopReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews/top`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch top reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (review) => setSelectedReview(review);
  const handleCloseModal = () => setSelectedReview(null);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSlider />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Featured Reviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              onViewDetails={() => handleViewDetails(review)}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/allReviews")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 shadow-md hover:shadow-lg transition-all"
          >
            Show All Reviews
          </button>
        </div>
      </section>

      <section className="mt-16">
        <TrendingRestaurants />
      </section>

      <section className="mt-16">
        <PopularFoods />
      </section>

      {selectedReview && (
        <Modal onClose={handleCloseModal}>
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <img
              src={selectedReview.foodImage || "https://i.ibb.co.com/3yH89bHm/noImages.jpg"}
              alt={selectedReview.foodName}
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
            />
            <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-800">
              {selectedReview.foodName}
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedReview.restaurantName}
              {selectedReview.restaurantLocation && ` - ${selectedReview.restaurantLocation}`}
            </p>
            <p className="text-gray-700 mt-3">{selectedReview.reviewText}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import Loader from "../../components/Loader/Loader";

const FeaturedReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

 const buttonStyle =
   "mx-auto px-4 py-3 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2"; 

 const textStyle =
   "text-3xl font-bold mb-6 text-center max-w-xs mx-auto border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";  

  // Fetch top reviews
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

  if (loading) return <Loader />;

  return (
    <section>
      <h2 className={textStyle}>Featured Reviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button onClick={() => navigate("/allReviews")} className={buttonStyle}>
          Show All Reviews
        </button>
      </div>
    </section>
  );
};

export default FeaturedReviews;
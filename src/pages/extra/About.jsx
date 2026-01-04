import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";

const textStyle =
  "text-3xl font-bold mx-auto text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

const About = () => {
  return (
    <div className="mx-auto px-4">
      {/* Header */}
      <div className="text-center">
        <h2 className={textStyle}>About Food Lovers</h2>
        <div className="relative mb-6 h-0.5 max-w-xs mx-auto bg-green-500 rounded-full" />
        <p className="px-20 text-gray-500 mx-auto">
          Local Food Lovers Network is a community-driven platform where food
          enthusiasts can share honest reviews, photos, and ratings of local
          restaurants, street food, and home-cooked meals. Discover new flavors,
          connect with fellow foodies, and celebrate local cuisine.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
        <div className="bg-base-300 p-6 rounded-lg shadow-xl hover:shadow-xl transition">
          <AiFillStar className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-500 mb-2">Top Reviews</h3>
          <p className="text-gray-500">
            Access the best reviews curated by our community to help you pick
            the perfect meal.
          </p>
        </div>

        <div className="bg-base-300 p-6 rounded-lg shadow-xl hover:shadow-xl transition">
          <HiOutlineUserGroup className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-500 mb-2">
            Community Driven
          </h3>
          <p className="text-gray-500">
            Join a network of local food lovers who share their experiences and
            connect over meals.
          </p>
        </div>

        <div className="bg-base-300 p-6 rounded-lg shadow-xl hover:shadow-xl transition">
          <AiOutlineHeart className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-500 mb-2">Favorites</h3>
          <p className="text-gray-500">
            Save your favorite reviews and revisit the dishes and restaurants
            you love most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
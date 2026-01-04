import React from "react";
import restaurant1 from "../../assets/restaurant1.jpg";
import restaurant2 from "../../assets/restaurant2.jpg";
import restaurant3 from "../../assets/restaurant3.jpg";

const restaurants = [
  {
    name: "Local Spot 1",
    description: "Popular for its delicious meals",
    image: restaurant1,
  },
  {
    name: "Local Spot 2",
    description: "Famous for authentic flavors",
    image: restaurant2,
  },
  {
    name: "Local Spot 3",
    description: "Must try for Food Lovers",
    image: restaurant3,
  },
];

const tendingStyle =
  "absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500";
const textStyle =
  "text-3xl font-bold mb-6 max-w-sm mx-auto text-center border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

const TrendingRestaurants = () => {
  return (
    <section>
      {/* Section Title */}
        <h2 className={textStyle}>Trending Restaurants</h2>
      
      {/* Restaurants Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={tendingStyle}></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
                {restaurant.name}
              </h3>
              <p className="text-gray-200 text-sm md:text-base drop-shadow-md">
                {restaurant.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingRestaurants;

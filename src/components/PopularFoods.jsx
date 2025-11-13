import React from "react";

const popularFoods = [
  { name: "Spicy Ramen", image: "https://i.ibb.co/Y4j3mC3g/spicy-ramen-recipe.jpg" },
  { name: "Sushi Platter", image: "https://i.ibb.co/V0H02HvH/Sushi-Platter.jpg" },
  { name: "Cheese Pizza", image: "https://i.ibb.co/j9LxT0sr/Cheese-Pizza.jpg" },
  { name: "Biryani", image: "https://i.ibb.co/F4wfSyzk/Biryani.jpg" },
  { name: "Tacos", image: "https://i.ibb.co/YBy90p7L/Tacos.jpg" },
  { name: "Ice Cream", image: "https://i.ibb.co/zhPGxVPS/Ice-Cream.jpg" },
];

const popularStyle = "absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"

const PopularFoods = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-600 mb-3">
          Popular Foods
        </h2>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {popularFoods.map((food, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl shadow-lg group cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Food Image */}
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className={popularStyle}></div>

            {/* Food Name */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg">
                {food.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularFoods;

import React from "react";
import HeroSlider from "./HeroSlider";
import FeaturedReviews from "./FeaturedReviews";
import TrendingRestaurants from "./TrendingRestaurants";
import PopularFoods from "./PopularFoods";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div>
      {/* Hero Slider */}
      <section className="mt-2">
        <HeroSlider />
      </section>

      {/* Featured Reviews */}
      <section className="mt-12 max-w-7xl mx-auto px-4">
        <FeaturedReviews />
      </section>
      {/* Other Sections */}
      <section className="mt-12 max-w-7xl mx-auto px-4">
        <TrendingRestaurants />
      </section>

      <section className="mt-12 max-w-7xl mx-auto px-4">
        <PopularFoods />
      </section>
      <section className="mt-12 max-w-7xl mx-auto px-4">
        <FAQ />
      </section>
    </div>
  );
};

export default Home;

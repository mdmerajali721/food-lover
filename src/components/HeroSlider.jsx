import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import "animate.css";

// Images
import pastaImg from "../assets/pasta.jpg";
import chickenImg from "../assets/chicken.jpg";
import tortillaImg from "../assets/tortilla.jpg";

const heroStyle = "absolute inset-0 rounded-2xl bg-gradient-to-b from-black/50 via-black/20 to-black/50"

const slides = [
  {
    id: 1,
    title: "Discover Local Flavors",
    subtitle: "Explore street foods, home-cooked meals & top restaurants near you",
    image: pastaImg,
    buttonText: "Explore Reviews",
    buttonLink: "/allReviews",
  },
  {
    id: 2,
    title: "Share Your Food Experience",
    subtitle: "Post reviews, photos, and let the community know your favorite dishes",
    image: chickenImg,
    buttonText: "Add Review",
    buttonLink: "/add-review",
  },
  {
    id: 3,
    title: "Find Top-Rated Foods",
    subtitle: "Check out what others love and discover new favorites around you",
    image: tortillaImg,
    buttonText: "View All",
    buttonLink: "/allReviews",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  const handleTouchStart = (e) => (touchStartX.current = e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      // swipe left → next
      setCurrentSlide((currentSlide + 1) % slides.length);
    } else if (touchEndX.current - touchStartX.current > 50) {
      // swipe right → prev
      setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section
      ref={sliderRef}
      className="relative w-full h-60 md:h-100 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Background */}
          <div
            className="w-full h-full rounded-2xl bg-center bg-cover brightness-75"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          {/* Gradient */}
          <div className={heroStyle}></div>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-32 text-white">
            <h1 className="text-2xl font-bold mb-4 animate__animated animate__fadeInDown">
              {slide.title}
            </h1>
            <p className="text-center mb-4 animate__animated animate__fadeInUp">
              {slide.subtitle}
            </p>
            <Link
              to={slide.buttonLink}
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105 animate__animated animate__fadeInUp"
            >
              {slide.buttonText}
            </Link>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-green-600 scale-125" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next Buttons */}
      <button
        onClick={() =>
          setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)
        }
        className="absolute top-1/2 left-3 sm:left-5 transform -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-4xl bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full transition z-30"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute top-1/2 right-3 sm:right-5 transform -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-4xl bg-black/30 hover:bg-black/50 p-2 sm:p-3 rounded-full transition z-30"
        aria-label="Next Slide"
      >
        &#10095;
      </button>
    </section>
  );
};

export default HeroSlider;

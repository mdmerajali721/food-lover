import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import "animate.css";

// Images
import pastaImg from "../../assets/pasta.jpg";
import chickenImg from "../../assets/chicken.jpg";
import tortillaImg from "../../assets/tortilla.jpg";

const heroOverlay =
  "absolute inset-0 rounded bg-gradient-to-b from-black/50 via-black/20 to-black/50";
const buttonStyle =
  "px-6 py-2 rounded bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-500 transition transform animate__animated animate__fadeInUp";  

const slides = [
  {
    id: 1,
    title: "Discover Local Flavors",
    subtitle:
      "Explore street foods, home-cooked meals & top restaurants near you",
    image: pastaImg,
    buttonText: "Explore Reviews",
    buttonLink: "/allReviews",
  },
  {
    id: 2,
    title: "Share Your Food Experience",
    subtitle:
      "Post reviews, photos, and let the community know your favorite dishes",
    image: chickenImg,
    buttonText: "Add Review",
    buttonLink: "/add-review",
  },
  {
    id: 3,
    title: "Find Top-Rated Foods",
    subtitle:
      "Check out what others love and discover new favorites around you",
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  const handleTouchStart = (e) =>
    (touchStartX.current = e.changedTouches[0].screenX);
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
          {/* Background Image */}
          <div
            className="w-full h-full bg-center bg-cover brightness-75"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>

          {/* Overlay */}
          <div className={heroOverlay}></div>

          {/* Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-32 text-white text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 animate__animated animate__fadeInDown">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-4 animate__animated animate__fadeInUp">
              {slide.subtitle}
            </p>
            <Link to={slide.buttonLink} className={buttonStyle}>
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
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "bg-green-600 scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "animate.css";

const faqs = [
  {
    q: "What is Food Lovers?",
    a: "Food Lovers is a community-driven platform where food enthusiasts share honest reviews, photos, and ratings of local restaurants, street food, and home-cooked meals.",
  },
  {
    q: "Do I need an account to view reviews?",
    a: "No. All reviews are publicly accessible. However, you must log in to add reviews, manage your content, or save favorites.",
  },
  {
    q: "How are featured reviews selected?",
    a: "Featured reviews are selected dynamically based on higher ratings and recent activity to highlight quality experiences.",
  },
  {
    q: "Can I edit or delete my reviews?",
    a: "Yes. From your dashboard, you can edit or delete your reviews anytime. A confirmation step prevents accidental deletion.",
  },
  {
    q: "How does the favorite system work?",
    a: "You can add any review to your favorites using the heart icon. All favorites appear in the My Favorites page.",
  },
  {
    q: "Is my data safe on this platform?",
    a: "Yes. We use Firebase authentication and secure backend authorization to protect your personal data.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  }; 

  const textStyle =
    "text-3xl font-bold mb-3 mx-auto text-center max-w-sm border-b-2 border-green-500 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent animate__animated animate__fadeInDown";

  return (
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className={textStyle}>FAQ</h1>
          <p className="text-gray-500 text-sm animate__animated animate__fadeInUp">
            Find answers to common questions about Food Lovers.
          </p>
          {/* <div className="mt-6 h-1.5 w-40 mx-auto bg-green-500 rounded-full" /> */}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              onClick={() => toggleFAQ(i)}
              className="bg-base-300 rounded shadow p-5 cursor-pointer transition hover:shadow-md"
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-green-500">
                  {item.q}
                </h3>

                <FaChevronDown
                  className={`transition-transform text-green-500 duration-300 ${
                    openIndex === i
                      ? "rotate-180 text-green-500"
                      : "text-gray-500"
                  }`}
                />
              </div>

              {/* Answer */}
              {openIndex === i && (
                <p className="mt-3 text-gray-500 animate__animated animate__fadeIn">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
  );
};

export default FAQ;

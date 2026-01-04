import React from "react";

const blogs = [
  {
    id: 1,
    title: "Top 10 Restaurants to Try in 2026",
    description:
      "Discover the best restaurants around your city with our curated list of must-visit places for food lovers.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
  {
    id: 2,
    title: "5 Easy Homemade Recipes",
    description:
      "Learn how to make delicious meals at home with simple ingredients and step-by-step instructions.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
  {
    id: 3,
    title: "Street Food Adventures",
    description:
      "Explore the world of street food and find hidden gems that will excite your taste buds.",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    link: "#",
  },
];

const textStyle =
  "text-3xl font-bold mx-auto text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

const Blog = () => {
  return (
    <div className="min-h-screen px-4 py-10">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className={textStyle}>Food Lover Blog</h1>
        <div className="relative mb-6 h-0.5 max-w-xs mx-auto bg-green-500 rounded-full" />
        <p className="text-gray-500 max-w-xl mx-auto">
          Stay updated with the latest food trends, recipes, and restaurant
          reviews from our vibrant community.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group bg-base-200 rounded overflow-hidden shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
          >
            {/* Image Container with Zoom Effect */}
            <div className="relative overflow-hidden h-64">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                {blog.title}
              </h2>
              <p className="text-gray-500 mb-6 flex-grow">{blog.description}</p>

              <div className="pt-4 border-t border-slate-100 mt-auto">
                <a
                  href={blog.link}
                  className="inline-flex items-center font-bold text-green-600 group/link"
                >
                  Read Full Story
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;

import { useState } from "react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // React Hot Toast
    toast.success("Thank you! Your message has been sent.", {
      duration: 4000,
      position: "top-center",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  // Tailwind Styles
  const textStyle =
    "text-3xl font-bold mx-auto text-center bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent";

  const buttonStyle =
    "mx-auto w-full py-3 cursor-pointer rounded font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 shadow-md transition-all duration-300 flex justify-center items-center gap-2";

  return (
    <div className="min-h-screen px-4 mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className={textStyle}>Contact Us</h1>
        <div className="relative mb-6 h-0.5 max-w-xs mx-auto bg-green-500 rounded-full" />
        <p className="text-gray-500 max-w-2xl mx-auto">
          Have a question, suggestion, or want to collaborate? Fill out the form
          below and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-3xl mx-auto bg-base-200 p-8 rounded shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-semibold text-gray-500">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-base-100 border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className={buttonStyle}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

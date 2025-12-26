import React, { useState } from "react";

import {
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Message Sent!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div
      className="relative w-full min-h-screen bg-white flex flex-col font-sans"
      id="get-in-touch"
    >
      {/* --- Top part white color --- */}
      <div className="w-full h-1/2 flex-grow relative z-10 px-6 md:px-8 lg:px-16 pt-12 md:pt-20 lg:pt-32 pb-32 md:pb-40 lg:pb-48">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* heading and paragraph on the left hand side - Hidden on mobile */}
          <div className="hidden lg:block w-full lg:w-1/2 pr-0 lg:pr-12 transform lg:translate-y-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed ">
              We are an industry-leading company that values honesty, integrity,
              and efficiency. Building quality products and caring.
            </p>
          </div>
        </div>

        {/* Blob - Positioned differently for mobile vs desktop */}
        <img
          src="blob.svg"
          className="absolute size-64 md:size-80 lg:size-96 
                     top-20 left-1/2 -translate-x-1/2 
                     md:top-32 md:left-1/2 md:-translate-x-1/2
                     lg:top-1/2 lg:left-1/2 lg:translate-x-72 lg:-translate-y-60 
                     rotate-45 opacity-80 lg:opacity-100"
          alt="blob"
        />
      </div>

      {/* --- Bottom part gray-900 color --- */}
      <div className="relative w-full bg-gray-900 h-[150px] md:h-[250px] lg:h-[300px] flex items-end overflow-hidden">
        {/* Banner Background */}
        <img
          src="/contactUSBanner.svg"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />
      </div>

      {/* --- Floating form card --- */}
      <div
        className="absolute 
                      top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2
                      md:top-1/2 md:-translate-y-[45%]
                      lg:top-1/2 lg:translate-x-0 lg:left-auto lg:right-[10%] lg:-translate-y-[40%]
                      w-[90%] max-w-[420px] 
                      md:max-w-[500px] 
                      lg:w-[500px] 
                      bg-white rounded-xl shadow-2xl z-20 
                      p-6 md:p-8 lg:p-10"
      >
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
          Need help with your queries?
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            <div className="group">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Aditya Kumar"
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                required
              />
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            <div className="group">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
                required
              />
            </div>
            <div className="group">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>
          </div>

          {/* Message */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={3}
              className="w-full border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white font-bold py-3 md:py-4 rounded-md shadow-lg hover:bg-gray-900 hover:shadow-xl transition-all duration-300 text-xs md:text-sm tracking-wide uppercase mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

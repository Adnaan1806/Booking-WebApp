import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen p-8 md:p-20">
      {/* Header */}
      <div className="text-center text-4xl font-extrabold text-gray-800">
        <p>
          About <span className="text-yellow-300">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[350px] rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-3/5 text-base text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-blue-400">Prescripto</span> is a
            streamlined appointment booking web app designed to simplify scheduling for users and service providers. It offers an intuitive interface, allowing users to book, manage, and track appointments with ease, ensuring a hassle-free experience.
          </p>
          <p>
            The app integrates features such as real-time availability, reminders, and customizable booking options. Prescripto aims to optimize time management, enhancing the overall user experience for both clients and providers.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
          <p>
            Our vision is to revolutionize the appointment booking experience by creating a seamless, efficient, and user-friendly platform.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-3xl font-extrabold text-gray-800 my-20 mt-24">
        <p>
          WHY <span className="text-yellow-300">CHOOSE US</span>
        </p>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 mb-20">
        {/* Card 1 */}
        <div className="flex-1 border rounded-lg bg-white shadow-lg px-8 py-12 text-center hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-white transition-all duration-500 cursor-pointer">
          <h4 className="text-2xl font-semibold mb-4">Efficiency</h4>
          <p className="font-regular">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 border rounded-lg bg-white shadow-lg px-8 py-12 text-center hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-white transition-all duration-500 cursor-pointer">
          <h4 className="text-2xl font-semibold mb-4">Convenience</h4>
          <p className="font-regular">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 border rounded-lg bg-white shadow-lg px-8 py-12 text-center hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-white transition-all duration-500 cursor-pointer">
          <h4 className="text-2xl font-semibold mb-4">Personalization</h4>
          <p className="font-regular">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

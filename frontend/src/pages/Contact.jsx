import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8 md:p-20">
      {/* Header */}
      <div className="text-center text-4xl font-bold text-gray-800 pt-9">
        <p>
          CONTACT <span className="text-primary">US</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="my-16 flex flex-col md:flex-row items-center gap-12 mb-28">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[400px] rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-8 bg-white p-10 rounded-xl shadow-lg w-full md:w-1/2">
          <div>
            <h3 className="font-semibold text-2xl text-gray-700">Our Office</h3>
            <p className="mt-4 text-gray-600">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-2xl text-gray-700">Get in Touch</h3>
            <p className="mt-4 text-gray-600">
              Tel: (+94) 76-272-2093 <br />
              Email: adnaanjanees0@gmail.com
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-2xl text-gray-700">
              Careers at <span className="text-primary">PRESCRIPTO</span>
            </h3>
            <p className="mt-4 text-gray-600">
              Learn more about our teams and job openings
            </p>
          </div>

          {/* Explore Jobs Button */}
          <button className="bg-primary text-white px-8 py-4 text-base rounded-lg hover:bg-opacity-90 transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

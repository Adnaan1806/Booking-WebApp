import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialtyMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-6 py-16 bg-white text-gray-800 mt-12"
      id="speciality"
    >
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-wide text-gray-900">
        Find by <span className="text-yellow-300">Specialty</span>
      </h1>
      <p className="sm:w-1/2 text-center text-sm md:text-base font-light text-gray-700">
        Browse through our extensive list of trusted doctors and schedule your appointments effortlessly.
      </p>

      {/* Specialty Cards */}
      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-center text-sm cursor-pointer flex-shrink-0 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 p-4"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img
              className="w-20 sm:w-24 mb-3 rounded-full border-4 border-yellow-300"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-gray-800 font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyMenu;

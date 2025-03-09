import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiSearch } from "react-icons/fi";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    let filteredDoctors = doctors;

    if (speciality) {
      filteredDoctors = filteredDoctors.filter(
        (doc) => doc.speciality === speciality
      );
    }

    if (searchQuery) {
      filteredDoctors = filteredDoctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilterDoc(filteredDoctors);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchQuery]); // Include searchQuery in dependencies

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="flex flex-col items-center gap-12 px-6 py-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Find Your <span className="text-yellow-300">Specialist</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Discover the best doctors across various specialties and book an
          appointment effortlessly.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor's name..."
          className="w-full px-4 py-2 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FiSearch
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>

      {/* Specialities Section */}
      <div className="flex flex-wrap justify-center gap-4 p-3 rounded-md">
        {specialities.map((spec) => (
          <button
            key={spec}
            onClick={() =>
              speciality === spec
                ? navigate("/doctors")
                : navigate(`/doctors/${spec}`)
            }
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm ${
              speciality === spec
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Section */}
      {/* Doctors Section */}
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white border rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              {/* Doctor Image */}
              <div className="w-full h-48 flex items-center justify-center bg-white">
                <img
                  className="h-full w-auto object-contain"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              {/* Doctor Details */}
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      item.available ? "bg-green" : "bg-gray-400"
                    }`}
                  ></span>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-red-600 text-base">Search result not found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;

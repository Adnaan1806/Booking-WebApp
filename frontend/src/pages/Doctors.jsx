import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

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
          Discover the best doctors across various specialties and book an appointment effortlessly.
        </p>
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
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filterDoc.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Doctors;

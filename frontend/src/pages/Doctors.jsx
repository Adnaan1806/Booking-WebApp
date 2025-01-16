import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
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
    <div className="flex flex-col items-center gap-10 px-4">
      {/* Header Section */}
      <p className="text-center text-4xl font-bold text-gray-800 pt-10 mb-6">
        Browse through the <span className="text-primary">doctor specialities.</span>
      </p>

      {/* Specialities Section */}
      <div className="flex flex-wrap justify-center gap-4">
        {specialities.map((spec) => (
          <p
            key={spec}
            onClick={() =>
              speciality === spec
                ? navigate("/doctors")
                : navigate(`/doctors/${spec}`)
            }
            className={`px-5 py-2 border border-gray-100 rounded-lg hover:scale-105 cursor-pointer text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-600 ${
              speciality === spec
                ? "bg-purple text-white font-semibold"
                : "text-gray-600 hover:bg-primary hover:text-white transition-all duration-400"
            }`}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* Doctors Section */}
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 gap-6">
  {filterDoc.map((item, index) => (
    <div
      key={index}
      onClick={() => navigate(`/appointment/${item._id}`)}
      className="border border-blue-100 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      {/* Updated Image Styling */}
      <div className="w-full h-45 flex items-center justify-center bg-lightOrange">
        <img
          className="h-full w-auto object-contain"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className="p-4">
      <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green' : 'text-gray-500'} `}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green' : 'bg-gray-500'}  rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
        <p className="text-gray-900 text-lg font-medium">{item.name}</p>
        <p className="text-gray-600 text-sm">{item.speciality}</p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Doctors;

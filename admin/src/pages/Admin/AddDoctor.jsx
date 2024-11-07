import React from "react";
import { assets } from "../../assets/assets";

const AddDoctor = () => {
  return (
    <form className="flex w-full justify-center items-center min-h-screen bg-gray-100 p-14">
      <div className="bg-white shadow-md px-10 py-8 border rounded-lg w-full max-w-3xl">
        <p className="text-3xl font-semibold text-gray-800 mb-6">Add Doctor</p>

        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-gray-100 rounded-full object-cover"
              src={assets.upload_area}
              alt="Upload Doctor"
            />
          </label>
          <input type="file" id="doc-img" hidden />
          <p className="text-gray-500">Upload Doctor's Picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="text"
              placeholder="Enter Doctor's Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <select
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              required
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Consultation Fee</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="number"
              placeholder="Enter Fee"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <select
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              required
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Education</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="text"
              placeholder="Enter Degree or Qualification"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none mb-2"
              type="text"
              placeholder="Address Line 1"
              required
            />
            <input
              className="border rounded-lg px-4 py-2 w-full focus:ring focus:ring-primary focus:outline-none"
              type="text"
              placeholder="Address Line 2"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Biography</label>
          <textarea
            className="w-full border rounded-lg px-4 py-3 focus:ring focus:ring-primary focus:outline-none"
            placeholder="Write a brief description about the doctor"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-lightRed transition-all duration-300 focus:outline-none focus:ring focus:ring-lightRed"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;

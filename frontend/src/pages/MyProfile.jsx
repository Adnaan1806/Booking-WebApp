import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="image" className="relative cursor-pointer">
            <div className="relative">
              <img
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="User"
              />
              {isEdit && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <img src={assets.upload_icon} alt="Upload" />
                </div>
              )}
            </div>
            {isEdit && (
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            )}
          </label>

          {isEdit ? (
            <input
              className="bg-gray-50 text-3xl font-semibold text-center mt-2 p-2 rounded-lg border focus:outline-none"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-semibold text-3xl text-gray-800">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="my-6" />

        <div className="text-left space-y-6">
          <div>
            <p className="text-xl font-semibold text-gray-700">
              Contact Information
            </p>
            <div className="grid grid-cols-[1fr_3fr] gap-4 mt-4">
              <p>Email:</p>
              <p className="text-blue-500">{userData.email}</p>

              <p>Phone:</p>
              {isEdit ? (
                <input
                  className="bg-gray-100 p-2 rounded-lg border focus:outline-none"
                  type="text"
                  value={userData.phone}
                  maxLength={12} // Limits input to 11 characters
                  pattern="^\+?[0-9]{1,11}$" // Regex for validation
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only numbers and '+' at the start
                    if (/^\+?[0-9]*$/.test(value) && value.length <= 12) {
                      setUserData((prev) => ({ ...prev, phone: value }));
                    }
                  }}
                />
              ) : (
                <p>{userData.phone}</p>
              )}

              <p>Address:</p>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    className="bg-gray-50 p-2 rounded-lg border focus:outline-none w-full"
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="bg-gray-50 p-2 rounded-lg border focus:outline-none w-full"
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
              ) : (
                <p>
                  {userData.address.line1} <br /> {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-700">
              Basic Information
            </p>
            <div className="grid grid-cols-[1fr_3fr] gap-4 mt-4">
              <p>Gender:</p>
              {isEdit ? (
                <select
                  className="bg-gray-50 p-2 rounded-lg border focus:outline-none"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}

              <p>Birthday:</p>
              {isEdit ? (
                <input
                  className="bg-gray-50 p-2 rounded-lg border focus:outline-none"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {isEdit ? (
            <button
              className="bg-customOrange text-white px-8 py-2 rounded-lg shadow hover:bg-red-800 transition"
              onClick={updateUserProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="bg-customOrange text-white px-8 py-2 rounded-lg shadow hover:bg-red-800 transition"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QMWyiARqvthfyeiPslNeZJP3oW51H7nHC8DFivzjScc0sfcJSoUxAAxyQPFHUx10PYwvNIMFuuajEkgHm5GgJWF00TCQ3q6OO");

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/create-payment-session",
        { appointmentId },
        { headers: { token } }
      );
  
      if (data.success) {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    }
  };
  
  // After successful payment, call this function
  const updatePaymentStatus = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/update-payment-status",
        { appointmentId },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success("Payment Successfull");
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment Failed");
    }
  };
  

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup when clicked
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  
    // Check for the `success` parameter in the URL
    const isSuccess = searchParams.get("success");
    const appointmentId = searchParams.get("appointmentId");
  
    if (isSuccess && appointmentId) {
      // Call the updatePaymentStatus function after a successful payment
      updatePaymentStatus(appointmentId);
  
      // Remove the URL parameters after handling them
      setSearchParams({});  // This will remove all the query parameters from the URL
    }
  }, [token, searchParams]);
  

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>


      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b mb-2"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-lightOrange rounded"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && !item.isCompleted && <button className="sm:min-w-48 py-2 border rounded-lg text-white font-medium bg-green hover:bg-green">Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => handlePayment(item._id)}
                  className="border text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded-lg hover:bg-green hover:text-white hover:font-semibold transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="border text-sm text-stone-500 text-center sm:min-w-48 py-2 rounded-lg hover:bg-red-600 hover:text-white hover:font-semibold transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border text-white font-medium bg-red-500 border-red-500 rounded-lg text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.isCompleted && <button className="sm:min-w-48 py-2 border font-medium text-white bg-green border-green rounded-lg text-green">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

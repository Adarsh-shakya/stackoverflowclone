import React from "react";
import {  useNavigate } from "react-router-dom";
import Subtion from "./Subtion";
import {  useSelector } from "react-redux";

import axios from "axios";
import { BACKEND_URL } from "../SocialMedia/config/Constant";

const Homee = () => {
 
  const User = useSelector((state) => state.currentUserReducer);
 
  const navigate = useNavigate();

  const checkoutHandler = async (amount, plan) => {
    try {
      // Perform the necessary payment verification and profile update here
      if (plan === "free" || amount === 0) {
        axios.post(`${BACKEND_URL}/api/paymentverification`, {
          userId: User?.result?._id,
          subscrition: plan,
        });

      
        navigate("/");
        alert("subscription successful");
      } else {
        const {
          data: { key },
        } = await axios.get(`${BACKEND_URL}/api/getkey`);
        const {
          data: { order },
        } = await axios.post(`${BACKEND_URL}/api/checkout`, {
          amount,
        });

        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "Stack Over Flow",
          description: "Payment gateway for stackoverflow",
          image: "https://media.wired.com/photos/5926db217034dc5f91becd6b/master/w_1904,c_limit/so-logo-s.jpg",
          order_id: order.id,
          prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#7395cc",
          },
          handler: async function (response) {
            const { razorpay_payment_id, razorpay_signature } = response;
            try {
              await axios.post(
                `${BACKEND_URL}/api/paymentverification`,
                {
                  razorpay_order_id: order.id,
                  razorpay_payment_id,
                  razorpay_signature,
                  userName: User?.result.name,
                  userId: User?.result?._id,
                  subscrition: plan,
                }
              );

      
              navigate('/');
              alert("Payment verification successful");
            } catch (error) {
              console.log(
                "An error occurred during payment verification:",
                error
              );
              alert("Payment verification failed");
            }
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      }
    } catch (error) {
      console.log("An error occurred during checkout:", error);
    }
  };

  return <Subtion onCheckout={checkoutHandler} />;
};

export default Homee;

import React, { useEffect, useState } from "react";
import "./HomeMainBar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../Pages/SocialMedia/config/Constant";
import axios from "axios";

const HomeMainBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsList = useSelector((state) => state.questionsReducer);
  let User = useSelector((state) => state.currentUserReducer);
  const userId = User?.result?._id;

  const [updatedUser, setUpdatedUser] = useState(null);
   


  useEffect(() => {
    if (userId) {
      axios
        .get(`${BACKEND_URL}/user/getCurrentUsers/${userId}`)
        .then((response) => {
          const user = response.data;
          setUpdatedUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId]);

   


  const checkAuth = () => {
    if (User === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      if (updatedUser?.subscrition === "null") {
        navigate("./Subtion");
      } else {
        if (updatedUser?.subscrition === "free") {
          if (updatedUser?.noOfQuestions < 1) {
            navigate("./AskQuestion");
          } else {
            alert("your question limit full!");
          }
        } else if (updatedUser?.subscrition === "silver") {
            
          if (updatedUser?.noOfQuestions < 5) {

            navigate("./AskQuestion");
          } else {
            alert("your question limit full!");
          }
        } else if (updatedUser?.subscrition === "gold") {
          navigate("./AskQuestion");
        }
      }
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Question</h1>
        ) : (
          <h1>All Question</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loding...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} Question</p>
            <QuestionList QuestionList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};
export default HomeMainBar;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AskQuestion.css";
import { BACKEND_URL } from "../SocialMedia/config/Constant";
import { askQuestion } from "../../../actions/question.js";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");
  const [updatedUser, setUpdatedUser] = useState(null);
  
 
  

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  

  useEffect(() => {
    const loadUser = async () => {
      if (User?.result?._id) {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/user/getCurrentUsers/${User?.result?._id}`
          );
          const user = response.data;
          setUpdatedUser(user);
        } catch (error) {
          console.log(error);
        }
      }
    };

    loadUser();
  }, [User?.result?._id]);

  
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      questionTitle,
      questionBody,
      questionTags,
      userPosted: User?.result.name,
      userId: User?.result?._id,
      noOfQuestions: updatedUser?.noOfQuestions,
    });

    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          questionTags,
          userPosted: User?.result.name,
          userId: User?.result?._id,
          noOfQuestions: updatedUser?.noOfQuestions + 1,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <h1>{questionBody}</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine your're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to amswer your
                question
              </p>
              <textarea
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                rows="10"
                cols="30"
                onKeyPress={handleEnter}
              />
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about </p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;




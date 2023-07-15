import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment'

const Questions=({question})=>{
    return(
    <div className='display-ans-container'>
        <div className="display-votes-ans">
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>votes</p>
        </div>
        <div className="display-votes-ans">
            <p>{question.noOfAnswers}</p>
            <p>answer</p>
        </div>
        <div className="display-question-details">
            <Link to={`/Question/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
            <div className="display-tags-time">
                <div className="display-tags">
                {
                    question.questionTags.map((tag)=>(
                        <p key={tag}>{tag}</p>
                    ))
                }
                </div>
                <p className="display-time">
                    asked {moment(question.askededOn).fromNow()} {question.userPosted}
                </p>
            </div>
        </div>
    </div>)
}
export default Questions;
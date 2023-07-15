import React, {useState} from "react";
import { useParams,Link,useNavigate,useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upVotes from '../../../assets/caret-up-solid.svg'
import downVotes from '../../../assets/caret-down-solid.svg'
import Avatar from '../../Avatar/Avatar'
import DisplayAnswer from "./DisplayAnswer";
import { postAnswer } from '../../../actions/question';
import { deleteQuestion,voteQuestion } from "../../../actions/question";
import './Question.css'


// import './Question.css'

const QuestionDetails=()=>{

   
    
    const {id}=useParams()
    const questionsList = useSelector(state => state.questionsReducer)
    
    // const questionsList=[{
    //     _id:'1',
    //     upVotes:4,
    //     downVotes:2,
    //     noOfAnswer:2,
    //     questionTitel:"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node js","react js","mongoDB"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswer:'Kumer',
    //         answerOn:'jan 2',
    //         userId:2,
    //     }]
    // },
    // {
    //     _id:'2',
    //     upVotes:2,
    //     downVotes:3,
    //     noOfAnswer:2,
    //     questionTitel:"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node js","react js","mongoDB"],
    //     userPosted:"mano",
    //     userId:1,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswer:'Kumer',
    //         answerOn:'jan 2',
    //         userId:2,
    //     }]
    // },
    // {
    //     _id:'3',
    //     upVotes:3,
    //     downVotes:4,
    //     noOfAnswer:2,
    //     questionTitel:"What is a function?",
    //     questionBody:"It meant to be",
    //     questionTags:["java","node js","react js","mongoDB"],
    //     userPosted:"mano",
    //     userId:3,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody:"Answer",
    //         userAnswer:'Kumer',
    //         answerOn:'jan 2',
    //         userId:2,
    //     }]
    // }]

    const [Answer, setAnswer]=useState('');
    
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'http://localhost:3000'

    const handlePostAns= (e , answerLength)=>{
            e.preventDefault()
            if(User==null)
            {
                alert('login or signup to answer a question')
                Navigate('/Auth')
            }else{
                if(Answer === '')
                {
                    alert('Enter an answer before submitting')
                }
                else{
                    dispatch(postAnswer({id,noOfAnswers:answerLength+1,answerBody:Answer,userAnswered:User.result.name, userId:User.result._id }))
                }
            }
    }

    const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote'))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote'))
    }


    return(
        <div className="Question-Details-page">
            {
                
          questionsList.data===null?
          <h1>Loading...</h1>:
          <div>
          {
            
             questionsList.data.filter(question => question._id === id).map(question=>(
            
                <div key={question._id}>
               
                
                  <section className="question-details-container">
                    <h1>{question.questionTitle}</h1>
                    <div className="question-details-container-2">
                        <div className="question-votes">
                            <img src={upVotes} alt='' width='18' className="votes-icon" onClick={handleUpVote}/>
                            <p>{question.upVote.length-question.downVote.length}</p>
                            <img src={downVotes} alt='' width='18' className="votes-icon" onClick={handleDownVote}/>
                        </div>
                        <div style={{width:'100%'}}>
                            <p className="question-body">{question.questionBody}</p>
                            <div className="question-details-tags">
                                {
                                    question.questionTags.map((tag) =>(
                                        <p key={tag}>{tag}</p>
                                    ))
                                }
                            </div>
                            <div className="question-action-user">
                                <div>
                                    <button type="button" onClick={handleShare} >Share</button>
                                    {
                                         User?.result?._id === question?.userId && ( 
                                     <button type='button' onClick={handleDelete}>Delete</button>
                                          )
                                    }
                                </div>
                                <div>
                                    <p>asked {moment(question.askededOn).fromNow()}</p>
                                    <Link to={`/User/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                        <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                        <div>
                                            {
                                                question.userPosted
                                            }
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                  </section>
                  {
                    question.noOfAnswers !==0 && (
                        <section>
                            <h3>{question.noOfAnswers} Answers</h3>
                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                        </section>
                    )
                  }
                  <section className="post-ans-container">
                    <h3>Your Answer</h3>
                    <form onSubmit={ (e) => { handlePostAns(e, question.answer.length) }}>
                        <textarea name="" id="" cols='30' rows='10' onChange={e => setAnswer(e.target.value)}></textarea>
                        <br/>
                        <input type='Submit' className='post-ans-btn' value='post Your Answesr'/>
                    </form>
                    <p>
                        Browser other Question tagged
                        {
                            question.questionTags.map((tag) => (
                                <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                            ))
                        } or 
                        <Link to='/AskQuestion' style={{TextDecoration:'none',color:'#009dff'}}>ask your own question.</Link>
                    </p>
                  </section>
                </div>
             ))
          }
          </div>
            } 
        </div>
    )
}

export default QuestionDetails;
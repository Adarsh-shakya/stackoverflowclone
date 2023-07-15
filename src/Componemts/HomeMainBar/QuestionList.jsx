import React from "react";

import Questions from "./Questions";


const QuestionList=({QuestionList})=>{

  
    return(
    <div>
      {  
          QuestionList.map((user) => (
            <Questions  question={user}/>
          ))
      
      }  
    </div>)
}
export default QuestionList;
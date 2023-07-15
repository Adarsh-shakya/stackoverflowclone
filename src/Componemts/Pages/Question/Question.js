import React from "react";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import HomeMainBar from "../../HomeMainBar/HomeMainBar";
import RightSideBar from "../../RightSideBar/RightSideBar";
 import '../../../App.css'
const Question=()=>{
    return(
        <div className="home-container-1">
            <LeftSideBar/>
            <div className="home-container-2">
             <HomeMainBar/>
             <RightSideBar/>
            </div>
        </div>
    )
}
export default Question;
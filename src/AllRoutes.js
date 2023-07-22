import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./Componemts/Pages/Home/Home";
import Auth from "./Componemts/Pages/Auth/Auth";
import Question from './Componemts/Pages/Question/Question';
import AskQuestion from "./Componemts/Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Componemts/Pages/Question/DisplayQuestion";
import Tags from "./Componemts/Pages/Tags/Tags";
import Users from "./Componemts/Users/Users";
import UserProfile from "./Componemts/Pages/UserProfile/UserProfile";
import Homee from "./Componemts/Pages/Subtion/Homee";


const AllRoutes=()=>{
    return(
        <Routes>
            
            < Route index element={<Home/>}/>
            < Route path='/Auth' element={<Auth/>}/>
            < Route path='/Question' element={<Question/>}/>
            < Route path='/AskQuestion' element={<AskQuestion/>}/>
            < Route path='/Question/:id' element={<DisplayQuestion/>}/>
            < Route path='/Tags' element={<Tags/>}/>
            <Route path='/Users' element={<Users/>}/>
            <Route path='/Users/:id' element={<UserProfile/>}/>
            <Route path='/Subtion' element={<Homee/>}/>
            

        </Routes>
        
    )
}

export default AllRoutes;

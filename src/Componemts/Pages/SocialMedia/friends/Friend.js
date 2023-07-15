import React from "react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import axios from "axios";
import { fetchAllUsers } from '../../../../actions/Users.js';
import { BACKEND_URL } from "../config/Constant.js";

const Friend = ({ user }) => {
  
   const currentUser = useSelector((state) => state.currentUserReducer);
   const currentUser_Id=currentUser?.result?._id
   const isFriend = currentUser?.result?.friends.includes(user._id) ;
   

  

  const handleAddFriend = () => {
    axios
      .post(`${BACKEND_URL}/user/${currentUser_Id}/add-friend/${user._id}`)
      .then((response) => {
        console.log("Friend added successfully:", response.data);
        fetchAllUsers();
        alert("add");
      })
      .catch((error) => {
        console.error("Failed to add friend:", error);
        // Handle the error
      });
  };

  const handleRemoveFriend = () => {
    axios
      .post(`${BACKEND_URL}/user/${currentUser_Id}/remove-friend/${user._id}`)
      .then((response) => {
        console.log("Friend removed successfully:", response.data);
        fetchAllUsers()
      })
      .catch((error) => {
        console.error("Failed to remove friend:", error);
        // Handle the error
      });
  };

  return (
    <div className="friend-contenar">
      <Link to={`/Users/${user._id}`} className="user-profile-link">
        <h3>{user.name.charAt(0).toUpperCase()}</h3>
        <h5>{user.name}</h5>
      </Link>
      <div className="btn">
        {isFriend ? (
          <button onClick={handleRemoveFriend}>Remove</button>
        ) : (
          <button onClick={handleAddFriend}>Add</button>
        )}
      </div>
    </div>
  );
};

export default Friend;



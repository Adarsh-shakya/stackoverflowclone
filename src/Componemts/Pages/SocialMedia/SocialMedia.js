import React, { useEffect, useState } from "react";
import "../../../App.css";
import "./SocialMedia.css";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import FriendList from "./friends/FriendList";
import UploadForm from "./UploadForm.js";
import UploadsList from "./UploadsList";
import axios from "axios";
import { BACKEND_URL } from "./config/Constant";

const SocialMedia = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URL}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <div className="media-container">
          <div className="media-header">
            <UploadForm getAllMedias={getAllMedias} />
          </div>
          <div className="display-video-contenat">
            <UploadsList medias={medias} />
          </div>
        </div>
        <div className="friends">
          <FriendList />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;

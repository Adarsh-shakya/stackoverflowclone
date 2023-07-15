import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "./config/Constant";
import copy from 'copy-to-clipboard'
import axios from "axios";

const UploadsList = ({ medias }) => {
  const [likes, setLikes] = useState({});

  const location = useLocation()
    const url = 'http://localhost:3000'

  const handleLike = (mediaId) => {
    axios
      .post(`${BACKEND_URL}/api/v1/media/${mediaId}/like`)
      .then((response) => {
        const updatedLikes = { ...likes, [mediaId]: response.data.likes };
        setLikes(updatedLikes);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to like the media");
      });
  };

  const handleShare = (mediaId) => {
    copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
    console.log(`Sharing media with ID: ${mediaId}`);
  };

  return (
    <div>
      {medias &&
        medias.map((media) => {
          return (
            <>
              {media.videos.map((video) => {
                const mediaId = media._id;
                return (
                  <div className="list-container" key={mediaId}>
                    <div className="list-header">
                      <h3>{media.name.charAt(0).toUpperCase()}</h3>
                      <h5>{media.name}</h5>
                    </div>

                    <div className="list">
                      {video.includes(".mp4") || video.includes(".mkv") ? (
                        <video preload="auto" width="100%" height="400px" controls>
                          <source src={`${BACKEND_URL}${video}`} />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img width="400px" height="400px" src={`${BACKEND_URL}${video}`} alt="Uploaded" />
                      )}
                    </div>

                    <div className="list-footer">
                      <button onClick={() => handleLike(mediaId)}>Like</button>
                      <h4>{likes[mediaId] || media.likes}</h4>
                      <button onClick={() => handleShare(mediaId)}>Share</button>
                    </div>
                  </div>
                );
              })}
            </>
          );
        })}
    </div>
  );
};

export default UploadsList;

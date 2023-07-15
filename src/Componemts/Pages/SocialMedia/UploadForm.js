import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "./config/Constant";

const UploadForm = ({ getAllMedias }) => {
  const [videos, setVideos] = useState("");
  const [image, setImage] = useState("");

  const User = useSelector((state) => state.currentUserReducer);

  const hadleSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();

    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", User?.result.name);

    axios
      .post(`${BACKEND_URL}/api/v1/media/create`, formdata)
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully", success);
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  const handleImage = (e) => {
    e.preventDefault();
    let formdata = new FormData();

    for (let key in image) {
      formdata.append("videos", image[key]);
    }

    formdata.append("name", User?.result.name);

    axios
      .post(`${BACKEND_URL}/api/v1/media/create`, formdata)
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully", success);
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <div className="form-contenar">
      <div className="user-profile-link">
        <h3>{User?.result.name.charAt(0).toUpperCase()}</h3>
        <h5>{User?.result.name}</h5>
      </div>
      <form onSubmit={hadleSubmit}>
        <div className="form-group">
          <input
            type="file"
            name="videos"
            className="form-control"
            accept=".mp4, .mkv"
            required
            onChange={(e) => setVideos(e.target.files)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          video
        </button>
      </form>

      <form onSubmit={handleImage}>
        <div>
          <input
            type="file"
            name="image"
            required
            className="form-control"
            onChange={(e) => {
              setImage(e.target.files);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Image
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

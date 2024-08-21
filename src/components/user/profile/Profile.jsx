import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../user/context/UserContext";
import { getMediaByUser, uploadMedia } from "../../../services/mediaAPI";
import LoadingSketch from "../../layout/Loading/LoadingSketch.jsx";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [photoFormData, setPhotoFormData] = useState({
    selectedFiles: [],
    previews: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [media, setMedia] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUserMedia = async () => {
      if (user) {
        try {
          const userMedia = await getMediaByUser(user.ID);
          setMedia(userMedia);
        } catch (error) {
          console.error("Error fetching user media:", error);
        }
      }
    };

    fetchUserMedia();
  }, [user]);

  const handlePhotoFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoFormData((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };

  const handlePhotoUpload = async () => {
    setIsLoading(true);
    try {
      if (!photoFormData.selectedFiles.length) {
        console.error("No files selected");
        return;
      }

      for (const file of photoFormData.selectedFiles) {
        const formData = new FormData();
        formData.append("Image", file);
        formData.append("UserID", user.ID);

        const response = await uploadMedia(formData);
        if (response.success) {
          console.log("Media uploaded successfully:", response.data);
        } else {
          console.error("Error uploading media:", response.error);
        }
      }

      alert("Media uploaded successfully");

      const updatedMedia = await getMediaByUser(user.ID);
      setMedia(updatedMedia);
      setPhotoFormData({
        selectedFiles: [],
        previews: [],
      });
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Error uploading media");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoFormData((prev) => ({
      ...prev,
      selectedFiles: [...prev.selectedFiles, ...files],
      previews: [...prev.previews, ...previews],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setPhotoFormData((prev) => {
      const newSelectedFiles = prev.selectedFiles.filter((_, i) => i !== index);
      const newPreviews = prev.previews.filter((_, i) => i !== index);
      return {
        ...prev,
        selectedFiles: newSelectedFiles,
        previews: newPreviews,
      };
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-navbar">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="profile-navbar-button"
        >
          POST PHOTOS
        </button>
        <button className="profile-navbar-button">EDIT PROFILE</button>
      </div>

      <div className="user-profile">
        <div className="image-container">
          <img src={user.Image} alt={user.Username} className="profile-image" />
        </div>
        <div className="user-details">
          <h2 className="username">{user.Username}</h2>
          <p className="bio">{user.Bio}</p>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="close-popup-button"
            >
              X
            </button>
            <div className="form-view-container">
              <div className="my-container-form">
                {isLoading && (
                  <div className="loading">
                    <LoadingSketch />
                  </div>
                )}
                <form className="my-form-form">
                  <div
                    className="my-form-group-form"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <label className="my-label-form" htmlFor="Images">
                      IMAGES
                    </label>
                    <input
                      className="my-input-form"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      style={{ display: "none" }}
                    />
                    <div
                      className="drop-zone"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                    >
                      <div
                        className="preview-images"
                        style={{ position: "relative" }}
                      >
                        {photoFormData.previews.map((src, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              display: "inline-block",
                              margin: "5px",
                            }}
                          >
                            <img
                              src={src}
                              alt={`Preview ${index}`}
                              style={{
                                width: "100px",
                                height: "auto",
                                margin: "5px",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              style={{
                                position: "absolute",
                                top: "0",
                                right: "0",
                                background: "rgba(255, 0, 0, 0.8)",
                                border: "none",
                                color: "white",
                                cursor: "pointer",
                              }}
                            >
                              X
                            </button>
                          </div>
                        ))}
                        {photoFormData.previews.length === 0 && (
                          <p>Drop images or click to select them</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="my-button-form"
                    onClick={handlePhotoUpload}
                  >
                    UPLOAD
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="user-media">
        <div className="media-columns">
          {Array.from({ length: 3 }).map((_, columnIndex) => (
            <div className="column" key={columnIndex}>
              {media
                .filter((_, index) => index % 3 === columnIndex)
                .map((item) => (
                  <div className="artwork-container" key={item.ID}>
                    <img
                      src={item.Image}
                      className="artwork-image"
                      alt={item.Title}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../user/context/UserContext";
import { getMediaByUser, uploadMedia } from "../../../services/mediaAPI";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    const fetchUserMedia = async () => {
      if (user) {
        try {
          const userMedia = await getMediaByUser(user.ID);
          setMedia(userMedia);
          console.log(userMedia);
        } catch (error) {
          console.error("Error fetching user media:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserMedia();
  }, [user]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("Image", selectedFile);
    formData.append("UserID", user.ID);

    try {
      const response = await uploadMedia(formData);
      if (response.success) {
        setUploadStatus("¡Foto subida exitosamente!");
        setMedia((prevMedia) => [...prevMedia, response.data]);
        setSelectedFile(null);
        setShowFileInput(false);
        console.log("Media uploaded successfully:", response.data);
      } else {
        setUploadStatus("Error al subir la foto");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploadStatus("Error al subir la foto");
    }
  };

  const handleShowFileInput = () => {
    setShowFileInput(true);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-image" src={user.Image} alt="Profile" />
        <h2 className="profile-username">{user.Username}</h2>
      </div>

      <div className="profile-details">
        <p className="profile-bio">{user.Bio ? user.Bio : "No bio available"}</p>
        <p className="profile-email">{user.Email}</p>
      </div>

      <div className="profile-media">
        <h3>User Media</h3>
        <div className="image-uploader">
          {uploadStatus ? (
            <p>{uploadStatus}</p>
          ) : (
            <div>
              {!showFileInput && (
                <button className="button-image-uploader" onClick={handleShowFileInput}>
                  POST PHOTO
                </button>
              )}
              {showFileInput && (
                <form onSubmit={handleUpload}>
                  <input type="file" onChange={handleFileChange} />
                  <button type="submit" disabled={!selectedFile}>
                    {selectedFile ? "Upload Media" : "Select a file first"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
        {loading ? (
          <div>Loading media...</div>
        ) : (
          <div className="media-grid">
            {media.map((item) => (
              <div key={item.ID} className="media-item">
                <img src={item.Image} className="media-image" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

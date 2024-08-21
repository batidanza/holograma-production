import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../../services/user/userDataService';
import { getMediaByUser } from '../../../services/mediaAPI';
import LoadingSketch from "../../layout/Loading/LoadingSketch";
import './CreativesDetail.css';

const CreativeDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserById(userId);
        setUser(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error al obtener detalles del usuario:", error);
      }
    };

    getUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const mediaData = await getMediaByUser(userId);
        setMedia(mediaData);
        console.log(mediaData);
      } catch (error) {
        console.error("Error al obtener la media del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMedia();
    }
  }, [userId]);

  return (
    <div>
      {loading ? (
        <LoadingSketch />
      ) : (
        <>
          {user && (
            <div className="user-profile">
              <div className="image-container">
                <img src={user.Image} alt={user.Username} className="profile-image" />
              </div>
              <div className="user-details">
                <h2 className="username">{user.Username}</h2>
                <p className="bio">{user.Bio}</p>
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
                        <img src={item.Image} className="artwork-image" alt={item.Title} />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreativeDetail;

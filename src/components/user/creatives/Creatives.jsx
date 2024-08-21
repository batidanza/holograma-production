import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { fetchUsers } from "../../../services/user/userDataService";
import "./Creatives.css";
import LoadingSketch from "../../layout/Loading/LoadingSketch";

const Creatives = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false); 
      }
    };

    getUsers();
  }, []);

  return (
    <div className="creatives-container">
      <h1 className="title">CREATIIVES</h1>
      {loading ? (
          <LoadingSketch/>
      ) : (
        <div className="card-containers">
          {users.map((user) => (
            <div className="user-container" key={user.ID}>
              <Link className="creative-link" to={`/creatives/${user.ID}`}>
                <div className="user-card">
                  <img
                    src={user.Image}
                    alt={user.Username}
                    className="user-image"
                  />
                  <div className="user-details">
                    <p>{user.Username}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Creatives;

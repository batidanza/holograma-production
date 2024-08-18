import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { fetchUsers } from "../../../services/user/userDataService";
import "./Creatives.css";

const Creatives = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getUsers();
  }, []);

  return (
    <div className="creatives-container">
      <h1 className="title">CREATIIVES</h1>
      {loading ? ( // Conditional rendering based on loading state
        <div className="loading">Loading...</div>
      ) : (
        <div className="card-containers">
          {users.map((user) => (
            <div className="user-container" key={user.ID}> {/* Move key prop here */}
              <Link className="creative-link" to={`/creatives/${user.ID}`}>
                {/* Wrap each card with Link */}
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

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            Holograma is not just a virtual art gallery but also a space where you can create art,
            explore creations by other users, and acquire artworks. Holograma is an
            immersive experience where you can explore different interactions with sound, multimedia art, and create works.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="about">ABOUT</Link></li>
            <li><Link to="magazine">MAGAZINE</Link></li>
            <li><Link to="contact">CONTACT</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</Link>
            <br />
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</Link>
            <br />
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link>
            <br />
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          </div>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>holograma.workspace@gmail.com</p>
          <p>Phone:<br/>54 9 11 3929 0545</p>
          <p> Address:<br/> Buenos Aires Palermo</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Holograma. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

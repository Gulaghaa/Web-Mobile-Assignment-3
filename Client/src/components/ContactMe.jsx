// Contact.jsx
import React from 'react';
import '../style/ContactMe.css'; // Make sure to import the CSS file

const ContactMe = () => {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" name="message" required />
        
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactMe;

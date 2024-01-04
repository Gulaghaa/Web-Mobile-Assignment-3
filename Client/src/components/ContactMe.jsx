import React, { useState } from 'react';
import { postJsonData } from '../services/getAPI'; 
import '../style/ContactMe.css';

const ContactMe = () => {
    const [formData, setFormData] = useState({
        subject: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postJsonData('http://localhost:3001/messages', formData);
            if (response) {
                alert('Message sent successfully');
                setFormData({ subject: '', email: '', message: '' }); 
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the message');
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Me</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" value={formData.name} onChange={handleInputChange} required />
                
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                
                <label htmlFor="message">Message:</label>
                <input type='text' id="message" name="message" value={formData.message} onChange={handleInputChange} required />
                
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default ContactMe;

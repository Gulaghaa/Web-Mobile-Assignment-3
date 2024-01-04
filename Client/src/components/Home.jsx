import React from 'react';
import '../style/Home.css';
import me from '../assets/me.jpg'


const HomePage = () => {
  const projects = [
    {
      name: '1. Keyboard',
      link: 'https://gulaghaa.github.io/Keyboard/',
      description: "Dive into the playful world of Keyboard! This project brings a fun twist to web development, combining HTML, CSS, and JavaScript to create an interactive keyboard experience. It's a perfect blend of creativity and coding, offering a unique way to engage with the basics of web technologies. Whether you're a coding enthusiast or just looking for some tech-based fun, Keyboard is sure to strike the right note!"
    },
    {
      name: '2. ChatSystem',
      link: 'https://github.com/Gulaghaa/ChatSystem',
      description: 'ChatSystem is an interactive platform offering real-time messaging functionalities. It employs a robust client-server architecture, ensuring seamless communication and user management. This project is ideal for those looking to understand the intricacies of building scalable, full-stack chat applications.'
    }, 
    {
      name: '3. Password Generator',
      link: 'https://gulaghaa.github.io/Password-Generator/',
      description: 'Utilizing a JavaScript-based algorithm, this application allows for the dynamic creation of passwords which can range from simple to complex based on user preferences. The user interface is designed for intuitive interaction, enabling the selection of various character sets including uppercase, lowercase, numerics, and symbols. The resultant passwords are crafted to meet diverse security requirements, reflecting a balance between complexity and memorability.'
    }
  ];

  const selfIntro = {
    name: 'Gulagha Abdullazada',
    phone: '(+994) 50-448-46-40',
    mail: 'agulagha14138@ada.edu.az',
    description: `There's magic in code. In this digital age, it's the wand I wield to create, solve, and innovate. At ADA University, where I'm polishing my craft in Computer Science, every project is a new adventure—a chance to make something unique, functional, and user-friendly. I'm all about turning complex problems into beautiful, simple solutions that work for everyone. My journey is about constant learning, perfecting my skills, and sharing them with the world. Dive into my portfolio to see the work that I'm proud of.`,
    imgUrl: me
  };

  return (
    <div className="home-container">
      <div className="self-intro">
        <img src={selfIntro.imgUrl} alt="Your Name" className="intro-image" />
        <div className="intro-text">
          <h2>{selfIntro.name}</h2>
          <h3>{selfIntro.phone}</h3>
          <h3>{selfIntro.mail}</h3>
          <p>{selfIntro.description}</p>
        </div>
      </div>
      <div className="introduction">
        <h1>Welcome to My Portfolio</h1>
        <p>Discover my projects and explore what I've been building.</p>
      </div>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


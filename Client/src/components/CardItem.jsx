import React, { useState } from 'react';
import { deleteJsonData } from '../services/getAPI';
import EditCard from './EditCard';
import '../style/CardItem.css';

function CardItem({ question, answer, imageForQuestion, imageForAnswer, createdDate, category, id, setData, setStatus, status, difficultyLevel }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteJsonData(`http://localhost:3001/flashCards/${id}`);
      setData(currentData => currentData.filter(item => item.id !== id));
      setStatus((prev) => !prev);
    } catch (error) {
      console.error('Error while deleting:', error);
    }
  };

  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
    if (!isEditPopupOpen) {
      setIsFlipped(false);
    }
  };

  return (
    <div className='cardContainer' onClick={handleClick}>
      <div className={`cardInner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className='cardFront cardVisual'>
          {imageForQuestion && <img src={imageForQuestion} style={{width:"100px", height:"100px"}} alt="Question" className="cardImage" />}
          <div>{question}</div>
          <div>{createdDate}</div>
          <div>{category}</div>
          <div>{status}</div>
          <div>{difficultyLevel}</div>
          <div className="buttonContainer">
            <button onClick={(e) => {
              e.stopPropagation(); 
              toggleEditPopup();
            }} className="editButton">Edit</button>
            <button onClick={handleDelete} className="deleteButton">Delete</button>
          </div>
        </div>
        <div className='cardBack cardVisual'>
          {imageForAnswer && <img src={imageForAnswer} style={{width:"100px", height:"100px"}} alt="Answer" className="cardImage" />}
          <div>{answer}</div>
          <div className="buttonContainer">
            <button onClick={(e) => {
              e.stopPropagation(); 
              toggleEditPopup();
            }} className="editButton">Edit</button>
            <button onClick={handleDelete} className="deleteButton">Delete</button>
          </div>
        </div>
      </div>
      {isEditPopupOpen && <EditCard 
        id={id} 
        initialQuestion={question} 
        initialAnswer={answer} 
        setData={setData} 
        closePopup={toggleEditPopup}
        setIsFlipped={setIsFlipped} />}
    </div>
  );
}

export default CardItem;

import React, { useState } from 'react';
import { deleteJsonData, updateJsonData } from '../services/getAPI'; 
import EditCard from './EditCard'; 
import '../style/CardItem.css';

function CardItem({ question, answer, createdDate, category, id, setData, setStatus }) {
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
      setStatus((prev) => !prev)
    } catch (error) {
      console.error('Error while deleting:', error);
    }
  };

  const toggleEditPopup = () => {
    setIsEditPopupOpen(!isEditPopupOpen);
  };

  return (
    <div className='cardContainer' onClick={handleClick}>
      <div className={`cardInner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className='cardFront cardVisual'>
          <div>{question}</div>
          <div>{createdDate}</div>
          <div>{category}</div>
          <button onClick={(e) => {
            e.stopPropagation(); 
            toggleEditPopup();
          }} className="editButton">Edit</button>

        </div>
        <div className='cardBack cardVisual'>
          <div>{answer}</div>
          <button onClick={handleDelete} className="deleteButton">Delete</button>
        </div>
      </div>
      {isEditPopupOpen && <EditCard id={id} initialQuestion={question} initialAnswer={answer} setData={setData} closePopup={toggleEditPopup} />}
    </div>
  );
}

export default CardItem;

import React, { useState } from 'react';
import { deleteJsonData } from '../services/getAPI'; 
import '../style/CardItem.css';

function CardItem({ question, answer, createdDate, category, id, setData }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); 

    try {
      await deleteJsonData(`http://localhost:3001/flashCards/${id}`);
      setData(currentData => currentData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error while deleting:', error);
    }
  };

  return (
    <div className='cardContainer' onClick={handleClick}>
      <div className={`cardInner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className='cardFront cardVisual'>
          <div>{question}</div>
          <div>{createdDate}</div>
          <div>{category}</div>
        </div>
        <div className='cardBack cardVisual'>
          <div>{answer}</div>
          <button onClick={handleDelete} className="deleteButton">
            <svg className="trashIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m4 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardItem;

import React, { useState } from 'react';
import { deleteJsonData } from '../services/getAPI';
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import EditCard from './EditCard';
import '../style/CardItem.css';

function CardItem({ question, answer, imageForQuestion, imageForAnswer, createdDate, category, id, setData, setStatus, status, difficultyLevel, onSelect, isSelected, modifiedDate }) {
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
          <label htmlFor={`checkbox-front-${id}`} onClick={(e) => e.stopPropagation()} className="cardCheckboxLabel">
            <input
              id={`checkbox-front-${id}`}
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect()}
              onClick={(e) => e.stopPropagation()}
              className="cardSelectCheckbox"
            />
            <span className="customCheckbox"></span>
          </label>
          {imageForQuestion && <img src={imageForQuestion} style={{ width: "100px", height: "100px", border: '2px solid rgb(92, 192, 246) ' }} alt="Question" className="cardImage" />}
          <div className='rightPart'>
            <div className='question'>{question}
              <div className='littlePart'>
                <div>{`Category: ${category}`}</div>
                <div>{`Difficulty Level: ${difficultyLevel}`}</div>
              </div>
            </div>
            <div>
              <div className="buttonContainer">
                <FaEdit onClick={(e) => {
                  e.stopPropagation();
                  toggleEditPopup();
                }} className="editButton" />
                <FaRegTrashAlt onClick={handleDelete} className="deleteButton" />
              </div>
              <div className='belowPart'>
                <div>{`*${status}`}</div>
                <div>{`Create Date: ${createdDate}`}</div>
                {modifiedDate && <div>{`Modified Date: ${modifiedDate}`}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='cardBack cardVisual'>
          <label htmlFor={`checkbox-back-${id}`} onClick={(e) => e.stopPropagation()} className="cardCheckboxLabel">
            <input
              id={`checkbox-back-${id}`}
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect()}
              onClick={(e) => e.stopPropagation()}
              className="cardSelectCheckbox"
            />
            <span className="customCheckbox"></span>
          </label>
          {imageForAnswer && <img src={imageForAnswer} style={{ width: "100px", height: "100px", border: '2px solid rgb(92, 192, 246) '  }} alt="Answer" className="cardImage" />}
          <div className='question' style={{width:'85%'}}>{answer}</div>
          <div className="buttonContainer" style={{width:" 5%"}}>
            <FaEdit onClick={(e) => {
              e.stopPropagation();
              toggleEditPopup();
            }} className="editButton" />
            <FaRegTrashAlt onClick={handleDelete} className="deleteButton" />
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

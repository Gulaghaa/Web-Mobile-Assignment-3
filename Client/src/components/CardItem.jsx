import React, { useState } from 'react';
import '../style/CartItem.css'

function CardItem({ question, answer, createdDate, category, id }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
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
        </div>
      </div>
    </div>
  );
}

export default CardItem;

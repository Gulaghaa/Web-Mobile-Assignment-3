import React, { useState, useEffect } from 'react';
import CreateCard from './CreateCard';
import CardItem from './CardItem';

export default function FlashCards() {
  const [data, setData] = useState([]);

  
  return (
    <div>
      <CreateCard setData={setData} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {data && data.map((event) => (
          <CardItem 
            question={event.question} 
            answer={event.answer} 
            createdDate={event.createdDate} 
            category={event.category} 
            key={event.id} 
            id={event.id}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
}

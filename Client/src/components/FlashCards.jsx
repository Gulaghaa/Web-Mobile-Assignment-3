import React, { useState, useEffect } from 'react';
import CreateCard from './CreateCard';
import CardItem from './CardItem';

export default function FlashCards() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([false]);


  
  return (
    <div>
      <CreateCard setData={setData} setStatus={setStatus} status={status} />
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
            setStatus={setStatus}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateCard from './CreateCard';
import CardItem from './CardItem';
import '../style/FlashCards.css';
import { updateJsonData, fetchJsonData } from '../services/getAPI';

export default function FlashCards() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortAttribute, setSortAttribute] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [selectedCards, setSelectedCards] = useState(new Set());



  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchJsonData('http://localhost:3001/flashCards');
      if (result) setData(result);
    };
    fetchData();
  }, []);




  const handleCardSelect = (cardId) => {
    setSelectedCards(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(cardId)) {
        newSelected.delete(cardId);
      } else {
        newSelected.add(cardId);
      }
      return newSelected;
    });
  };

  const handleShare = () => {
    if (selectedCards.size === 0) {
      return;
    }
    const selectedCardDetails = data
      .filter(card => selectedCards.has(card.id))
      .map(({ imageForQuestion, imageForAnswer, ...rest }) => rest);
    const emailBody = encodeURIComponent(JSON.stringify(selectedCardDetails, null, 2));
    window.open(`mailto:?subject=Shared Flash Cards&body=${emailBody}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortAttributeChange = (e) => {
    setSortAttribute(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const parseDate = (dateString) => {
    if (!dateString) {
      return new Date(0);
    }
    const [hours, minutes] = dateString.split(':').map(Number);
    return new Date().setHours(hours, minutes, 0, 0);
  };

  const sortData = (data) => {
    if (!sortAttribute) {
      return data;
    }
    return data.sort((a, b) => {
      let valueA, valueB;
      if (sortAttribute === 'createdDate' || sortAttribute === 'modifiedDate') {
        valueA = parseDate(a[sortAttribute]);
        valueB = parseDate(b[sortAttribute]);
      } else if (sortAttribute === 'id') {
        // Sort numerically for 'id'
        valueA = parseInt(a[sortAttribute], 10);
        valueB = parseInt(b[sortAttribute], 10);
      } else {
        valueA = a[sortAttribute].toString().toLowerCase();
        valueB = b[sortAttribute].toString().toLowerCase();
      }
  
      if (valueA < valueB) {
        return sortOrder === 'ascending' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };
  

  const filteredData = sortData(data.filter(card => {
    const searchMatch = card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'All' || card.status === statusFilter;
    return searchMatch && statusMatch;
  }));

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    // Update the order attribute for each item
    const updatedItems = items.map((item, index) => ({ ...item, order: index }));
  
    setData(updatedItems);
  
    // Persist the new order to the server
    for (const item of updatedItems) {
      await updateJsonData(`http://localhost:3001/flashCards/${item.id}`, item);
    }
  };
  
  // When fetching data
  useEffect(() => {
    const fetchData = async () => {
      let result = await fetchJsonData('http://localhost:3001/flashCards');
      if (result) {
        // Sort the data by the order attribute
        result.sort((a, b) => a.order - b.order);
        setData(result);
      }
    };
    fetchData();
  }, []);
  

  console.log(data)

  return (
    <div>
      <div style={{ display: "flex" }} className='FlashCardUpper'>
        <div>
          <input type="text" placeholder="Search cards..." value={searchTerm} onChange={handleSearchChange} className="searchInput" />
          <CreateCard setData={setData} setStatus={setStatus} status={status} />
        </div>
        <div>
          <div>
            <span>Filtering:</span>
            <select onChange={handleStatusFilterChange} className="statusFilter">
              <option value="All">All</option>
              <option value="Learned">Learned</option>
              <option value="Want to Learn">Want to Learn</option>
              <option value="Noted">Noted</option>
            </select>
          </div>
          <div>
            <span>Sorting:</span>
            <select onChange={handleSortAttributeChange} className="sortAttribute">
              <option value="">Select Attribute</option> 
              <option value="id">ID</option>
              <option value="createdDate">Created Date</option>
              <option value="modifiedDate">Modified Date</option>
              <option value="status">Status</option>
            </select>
            <select onChange={handleSortOrderChange} className="sortOrder">
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
          <button onClick={handleShare} className={selectedCards.size === 0 ? "disabledShareButton" : "shareButton"} disabled={selectedCards.size === 0}>Share Selected</button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableCards">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="cardsContainer">
              {filteredData.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <CardItem
                        question={event.question}
                        answer={event.answer}
                        createdDate={event.createdDate}
                        category={event.category}
                        id={event.id}
                        image={event.image}
                        setData={setData}
                        setStatus={setStatus}
                        imageForQuestion={event.imageForQuestion}
                        imageForAnswer={event.imageForAnswer}
                        status={event.status}
                        onSelect={() => handleCardSelect(event.id)}
                        isSelected={selectedCards.has(event.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

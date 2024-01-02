import React, { useState } from 'react';
import CreateCard from './CreateCard';
import CardItem from './CardItem';
import '../style/FlashCards.css';

export default function FlashCards() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortAttribute, setSortAttribute] = useState('id');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [selectedCards, setSelectedCards] = useState(new Set());



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
    return data.sort((a, b) => {
      let valueA, valueB;
      if (sortAttribute === 'createdDate' || sortAttribute === 'modifiedDate') {
        valueA = parseDate(a[sortAttribute]);
        valueB = parseDate(b[sortAttribute]);
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button onClick={handleShare} className="shareButton" disabled={selectedCards.size === 0}>Share Selected</button>
        <input
          type="text"
          placeholder="Search cards..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="searchInput"
        />
        <select onChange={handleStatusFilterChange} className="statusFilter">
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to Learn">Want to Learn</option>
          <option value="Noted">Noted</option>
        </select>
        <select onChange={handleSortAttributeChange} className="sortAttribute">
          <option value="id">ID</option>
          <option value="createdDate">Created Date</option>
          <option value="modifiedDate">Modified Date</option>
          <option value="status">Status</option>
        </select>
        <select onChange={handleSortOrderChange} className="sortOrder">
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
        <CreateCard setData={setData} setStatus={setStatus} status={status} />
      </div>
      <div className="cardsContainer">
        {filteredData.length > 0 ? (
          filteredData.map((event) => (
            <CardItem
              question={event.question}
              answer={event.answer}
              createdDate={event.createdDate}
              category={event.category}
              key={event.id}
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
          ))
        ) : (
          <div className="noCardsMessage">No cards found matching your search or filter.</div>
        )}
      </div>
    </div>
  );
}

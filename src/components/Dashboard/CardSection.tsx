'use client';

import React, { useState } from 'react';
import Card from './Card';

interface CardSectionProps {
  numCards: number;
}

const CardSection: React.FC<CardSectionProps> = ({ numCards }) => {
  const cardData = [
    { count: 42, title: 'Group1', color1: '#4a90e2', color2: '#50e3c2' },
    { count: 1337, title: 'Group2', color1: '#ff6b6b', color2: '#feca57' },
    { count: 7, title: 'Group3', color1: '#5f27cd', color2: '#54a0ff' },
    { count: 34, title: 'Group4', color1: '#4a98F2', color2: '#50e3c2' },
    { count: 117, title: 'Group5', color1: '#ff9ff3', color2: '#feca57' },
    { count: 798, title: 'Group6', color1: '#58f7cd', color2: '#54a0ff' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(cardData.length / numCards);

  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title} card`);
    // Add your click handling logic here
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const startIndex = currentPage * numCards;
  const visibleCards = cardData.slice(startIndex, startIndex + numCards);

  return (
    <div>
      <div className="flex flex-wrap -mx-2">
        {visibleCards.map((card, index) => (
          <div key={index} className="w-1/2 lg:w-1/3 px-2 mb-4">
            <Card
              count={card.count}
              title={card.title}
              color1={card.color1}
              color2={card.color2}
              onClick={() => handleCardClick(card.title)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          ← Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default CardSection;

'use client';
import React from 'react';
import Recent from './Recent';

interface RecentSectionProps {
  numRecents: number;
}

const RecentSection: React.FC<RecentSectionProps> = ({ numRecents }) => {
  const recentData = [
    {
      title: 'Thank You Note',
      date: '7/9/2024',
      group: 'Wedding Party',
      color1: '#4a90e2',
      color2: '#50e3c2',
    },
    {
      title: 'Birthday Card',
      date: '7/8/2024',
      group: 'Family',
      color1: '#ff6b6b',
      color2: '#feca57',
    },
    {
      title: 'Congratulations',
      date: '7/7/2024',
      group: 'Work',
      color1: '#5f27cd',
      color2: '#54a0ff',
    },
    {
      title: 'Anniversary Card',
      date: '7/6/2024',
      group: 'Family',
      color1: '#ff9ff3',
      color2: '#feca57',
    },
    {
      title: 'Get Well Soon',
      date: '7/5/2024',
      group: 'Friends',
      color1: '#1dd1a1',
      color2: '#10ac84',
    },
  ];

  const handleRecentClick = (title: string) => {
    console.log(`Clicked on ${title} item`);
    // Add your click handling logic here
  };

  return (
    <div className="w-full md:ml-16">
      <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 shadow-lg md:mr-10">
        <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
        <div className="space-y-4">
          {recentData.slice(0, numRecents).map((recent, index) => (
            <Recent
              key={index}
              title={recent.title}
              date={recent.date}
              group={recent.group}
              color1={recent.color1}
              color2={recent.color2}
              onClick={() => handleRecentClick(recent.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSection;

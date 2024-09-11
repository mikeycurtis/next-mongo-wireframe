import React, { useState } from 'react';
import LetterListItem from './LetterListItem';
import LetterType from '@/types/types';

interface GroupType {
  name: string;
  color: string;
  letters: LetterType[];
}

export default function LetterList({
  handleSelectLetter,
  handleDeleteLetter,
  groups,
}: {
  handleSelectLetter: (
    sender: string,
    receiver: string,
    message: string
  ) => void;
  handleDeleteLetter: (letterId: string) => void;
  groups: GroupType[];
}) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <div className="space-y-2">
      {groups.map((group) => (
        <div
          key={group.name}
          className="rounded-lg overflow-hidden shadow-md"
          style={{ '--group-color': group.color } as React.CSSProperties}
        >
          <div
            onClick={() => toggleGroup(group.name)}
            className={`p-3 cursor-pointer flex justify-between items-center transition-colors duration-300`}
            style={{ backgroundColor: group.color }}
          >
            <span className="font-semibold">{group.name}</span>
            <span className="text-sm">({group.letters.length})</span>
          </div>
          {expandedGroups.includes(group.name) && (
            <div className="bg-opacity-30">
              {group.letters.map((letter) => (
                <div key={letter._id}>
                  <LetterListItem
                    letter={letter}
                    handleSelectLetter={handleSelectLetter}
                    handleDeleteLetter={handleDeleteLetter}
                    bgColor={group.color}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

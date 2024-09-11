'use client';
import Letter from '@/components/Letters/Letter';
import LetterList from '@/components/Letters/LetterList';
import EditLetter from './EditLetter';
import { useState } from 'react';
import LetterType from '@/types/types';
import { useRouter } from 'next/navigation';

interface GroupType {
  name: string;
  color: string;
  letters: LetterType[];
}

const sampleGroups: GroupType[] = [
  {
    name: 'Personal Letters',
    color: '#f0e68c', // khaki
    letters: [
      {
        _id: '1',
        title: 'Birthday Wishes',
        sender: 'John',
        receiver: 'Alice',
        message: 'Happy birthday, Alice! Hope you have a great day.',
        userId: 'user123',
        createdAt: '2024-07-01T10:00:00Z',
        updatedAt: '2024-07-01T10:00:00Z',
      },
      {
        _id: '2',
        title: 'Congratulations',
        sender: 'Emma',
        receiver: 'Tom',
        message: 'Congrats on your new job, Tom! So proud of you.',
        userId: 'user123',
        createdAt: '2024-07-02T14:30:00Z',
        updatedAt: '2024-07-02T14:30:00Z',
      },
    ],
  },
  {
    name: 'Work Correspondence',
    color: '#add8e6', // light blue
    letters: [
      {
        _id: '3',
        title: 'Project Update',
        sender: 'Sarah',
        receiver: 'Team',
        message: "Here's the latest update on Project X...",
        userId: 'user123',
        createdAt: '2024-07-03T09:15:00Z',
        updatedAt: '2024-07-03T09:15:00Z',
      },
      {
        _id: '4',
        title: 'Meeting Request',
        sender: 'Boss',
        receiver: 'You',
        message: 'Can we schedule a meeting to discuss the quarterly report?',
        userId: 'user123',
        createdAt: '2024-07-04T11:45:00Z',
        updatedAt: '2024-07-04T11:45:00Z',
      },
    ],
  },
  {
    name: 'Drafts',
    color: '#ffa07a', // light salmon
    letters: [
      {
        _id: '5',
        title: 'Ideas for Novel',
        sender: 'Me',
        receiver: 'Self',
        message: 'Chapter 1: It was a dark and stormy night...',
        userId: 'user123',
        createdAt: '2024-07-05T20:00:00Z',
        updatedAt: '2024-07-05T20:00:00Z',
      },
    ],
  },
];

export default function LetterLayout({
  fetchedLetters,
}: {
  fetchedLetters: LetterType[];
}) {
  const [selectedSender, setSelectedSender] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');
  const [letters, setLetters] = useState(fetchedLetters);

  const router = useRouter();

  const handleSelectLetter = (
    sender: string,
    receiver: string,
    message: string
  ) => {
    setSelectedSender(sender);
    setSelectedReceiver(receiver);
    setSelectedMessage(message);
  };

  const handleDeleteLetter = (letterId: string) => {
    const updatedLetters = letters.filter(
      (letter) => letter._id.toString() !== letterId
    );
    setLetters(updatedLetters);
    try {
      fetch(`/api/letters/delete/${letterId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting letter from db.', error);
    }
  };

  return (
    <div className="pt-16 h-screen flex flex-col-reverse justify-end md:grid md:grid-cols-[50%_50%]">
      <div className="m-3">
        <button
          className="btn btn-primary mb-4 w-full"
          onClick={() => router.replace('/dashboard/create')}
        >
          Create Letter
        </button>
        <LetterList
          handleSelectLetter={handleSelectLetter}
          handleDeleteLetter={handleDeleteLetter}
          groups={sampleGroups}
        />
      </div>

      <div className="flex justify-center">
        <EditLetter />
      </div>
    </div>
  );
}

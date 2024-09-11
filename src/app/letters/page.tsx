'use server';
import LetterLayout from '@/components/Letters/LetterLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const data = await getServerSession(authOptions);
  const uid = data?.user?.id;

  let fetchedLetters = [];
  try {
    const res = await fetch(`http://localhost:3000/api/letters/${uid}`);

    if (res.ok) {
      const data = await res.json();
      fetchedLetters = data.letters;
    } else {
      console.error('Failed to fetch letters');
    }
  } catch (error) {
    console.error('Error fetching letters:', error);
  }
  return <LetterLayout fetchedLetters={fetchedLetters} />;
}

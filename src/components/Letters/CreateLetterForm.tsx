'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// TODO FIX: If the user double clicks create fast it makes two letters
export default function CreateLetterForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState('');
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !sender || !receiver || !message) {
      setError('All fields are required.');
      return;
    }
    try {
      const res = await fetch('/api/letters/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          sender,
          receiver,
          message,
          userId: session?.user?.id,
        }),
      });

      const responseData = await res.json();
      if (res.ok) {
        router.replace('/dashboard');
      } else {
        setError(responseData.message);
        console.log('Letter Creation Failed.');
      }
    } catch (error) {
      console.log('Error during letter creation: ', error);
    }
  };

  return (
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary">
      <h1 className="text-xl font-bold my-4">Create a new Letter!</h1>

      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            id="title"
            name="title"
            className="grow w-[400px]"
            placeholder="Letter Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            id="sender"
            name="sender"
            className="grow w-[400px]"
            placeholder="Sender"
            onChange={(e) => setSender(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            id="receiver"
            name="receiver"
            className="grow w-[400px]"
            placeholder="Receiver"
            onChange={(e) => setReceiver(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            id="message"
            name="message"
            className="grow w-[400px]"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Create Letter
        </button>
        {error && (
          <div className="bg-accent text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            Try again! {error}
          </div>
        )}
        <div className="text-sm mt-3 text-right">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

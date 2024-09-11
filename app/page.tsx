import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from './api/auth/[...nextauth]/route';
import LoginForm from '@/components/Login/LoginForm';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/register');
  return (
    <div className="pt-16">
      <LoginForm />
    </div>
  );
}

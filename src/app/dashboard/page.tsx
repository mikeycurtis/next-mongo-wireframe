'use server';
import CardSection from '@/components/Dashboard/CardSection';
import RecentSection from '@/components/Dashboard/RecentSection';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function DashboardPage() {
  const data = await getServerSession(authOptions);
  const uid = data?.user?.id;
  const name = data?.user?.firstName;

  return (
    <div className="pt-20 px-4 sm:px-6">
      <div className="flex flex-col md:grid md:grid-cols-[50%_50%]">
        <div className="w-full md:w-auto md:ml-10">
          <h1 className="text-2xl mb-4">Welcome back, {name}</h1>
          <div className="flex flex-row justify-between">
            <Link
              href="dashboard/create"
              className="w-[49%] mb-4 rounded-lg bg-primary h-10 text-white flex items-center justify-center"
            >
              Create New Letter
            </Link>
            <Link
              href="dashboard/create"
              className="w-[49%] mb-4 rounded-lg bg-secondary h-10 text-white flex items-center justify-center"
            >
              Create New Group
            </Link>
          </div>

          <CardSection numCards={6} />
        </div>
        <div className="recentslist w-full md:w-auto mt-4 md:mr-10 md:mt-0 ">
          <RecentSection numRecents={5} />
        </div>
      </div>
    </div>
  );
}

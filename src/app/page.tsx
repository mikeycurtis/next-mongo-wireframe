import MainHero from "@/components/Home/MainHero";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");
  return (
    <div className="pt-16">
      <MainHero />
    </div>
  );
}

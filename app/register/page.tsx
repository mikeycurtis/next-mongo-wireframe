import RegisterForm from "@/components/Register/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/user");
  return (
    <div className="pt-16 grid place-items-center h-screen">
      <RegisterForm />
    </div>
  );
}

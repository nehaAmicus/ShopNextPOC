import { redirect } from "next/navigation";
import { getServerSession } from "../di/get-server-session";

async function AccountContent() {
  const user = await getServerSession();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">My Account</h1>

      <p className="mt-4">Welcome, {user.firstName}!</p>

      <p>{user.email}</p>
    </main>
  );
}
export default AccountContent;

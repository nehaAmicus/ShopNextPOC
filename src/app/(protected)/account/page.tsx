import { Suspense } from "react";
import LogoutButton from "@/features/auth/presentation/LogoutButton";
import AccountContent from "@/features/auth/presentation/AccountContent";

export default function AccountPage() {
  return (
    <Suspense fallback={<p>Loading account...</p>}>
      <AccountContent />
      <LogoutButton />
    </Suspense>
  );
}

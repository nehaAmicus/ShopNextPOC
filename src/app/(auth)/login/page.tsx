import LoginForm from "@/features/auth/presentation/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>

        <p className="text-gray-500 mb-6">Sign in to your ShopNext account.</p>

        <LoginForm />

        <p className="text-sm text-gray-500 mt-6">Demo username: emilys</p>
      </div>
    </main>
  );
}

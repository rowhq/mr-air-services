"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { EyeIcon, EyeOffIcon } from "@/components/admin/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-secondary/5 dark:from-neutral-900 dark:via-neutral-900 dark:to-secondary/10 p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Card */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl dark:shadow-2xl shadow-neutral-200/50 dark:shadow-black/20 p-8 md:p-10">
          {/* Header con Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.svg"
                alt="Mr. Air Services"
                width={48}
                height={48}
                className="dark:hidden"
              />
              <Image
                src="/logo-white.svg"
                alt="Mr. Air Services"
                width={48}
                height={48}
                className="hidden dark:block"
              />
            </div>
            <h1 className="text-2xl font-bold text-neutral-black dark:text-white">
              Mr. Air Services
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">
              Admin Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm animate-fade-in-up border border-red-100 dark:border-red-900/30">
                {error}
              </div>
            )}

            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@mrairservices.com"
              autoComplete="email"
            />

            {/* Password Input con Toggle */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              size="lg"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
            Need access? Contact the administrator.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-6">
          © {new Date().getFullYear()} Mr. Air Services
        </p>
      </div>
    </div>
  );
}

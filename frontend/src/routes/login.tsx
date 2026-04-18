import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/sandars/Header";
import { Footer } from "@/components/sandars/Footer";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("admin_token", data.access_token);
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-paper min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-tight mb-4">
              Administrator
            </h1>
            <p className="text-sm tracking-[0.2em] text-rose uppercase font-medium">
              The Sandars Portal
            </p>
          </div>

          <div className="bg-paper-soft border border-border/40 p-10 md:p-12 shadow-card transition-all duration-500 hover:shadow-xl">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-rose/10 border border-rose/20 text-rose text-xs tracking-wide p-4 font-medium text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] tracking-display uppercase text-ink/60 font-semibold pl-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-paper border border-border/60 px-5 py-4 text-sm focus:outline-none focus:border-rose/50 transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] tracking-display uppercase text-ink/60 font-semibold pl-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-paper border border-border/60 px-5 py-4 text-sm focus:outline-none focus:border-rose/50 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose text-paper py-5 text-[11px] tracking-display uppercase font-bold hover:bg-ink transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>
          </div>
          
          <p className="mt-8 text-center text-[10px] tracking-display uppercase text-ink/40">
            Secure Administrator Access Only
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

import { useState } from "react";
import AdminPanel from "@/components/AdminPanel";

export default function AdminPanelWrapper({ language, onArticleAdd }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simple static password, replace with ENV variable in production
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-md rounded-xl w-80">
          <h2 className="text-lg font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="password"
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <AdminPanel language={language} onArticleAdd={onArticleAdd} />;
}

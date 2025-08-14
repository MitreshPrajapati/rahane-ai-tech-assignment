"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ENDPOINTS from "@/utils/Endpoints";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const { request } = useApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await request({
      method: "POST",
      endpoint: ENDPOINTS.LOGIN,
      body: { email, password },
    });
    // console.log(data);
    const token = data?.data?.token;
    login(token);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
        <p>
          Don't have an account? <Link href="/register">Register</Link>{" "}
        </p>
      </form>
    </div>
  );
}

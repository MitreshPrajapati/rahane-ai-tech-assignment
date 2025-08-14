"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ENDPOINTS from "@/utils/Endpoints";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { request } = useApi();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await request({
      endpoint: ENDPOINTS.REGISTER ,
      method: "POST",
      body: { email, password },
    });
    // const response = await axios.post(ENDPOINTS.REGISTER, { email, password });
    // const data = await response.json();
    // console.log(res);
    router.push('/login')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Sign up</h2>
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign up
        </button>
        <p>
          Already have an account? <Link href="/login">login</Link>{" "}
        </p>
      </form>
    </div>
  );
}

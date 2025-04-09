// File: src/app/page.jsx
"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 space-y-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Welcome to FB Helpdesk</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/register">
            <button className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium text-lg">Register</button>
          </Link>
          <Link href="/login">
            <button className="w-full py-3 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium text-lg">Login</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

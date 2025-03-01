import React from 'react';
import Link from 'next/link';
import SignInForm from './_components/signInForm';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 border rounded-lg shadow-lg w-96 flex flex-col gap-6 items-center">
        <h1 className="text-center text-3xl font-extrabold text-gray-800">
          Welcome Back!
        </h1>

        <SignInForm />

        <Link
          href="/auth/forgot"
          className="text-blue-600 text-sm hover:underline hover:text-blue-700"
        >
          Forgot Your Password?
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;

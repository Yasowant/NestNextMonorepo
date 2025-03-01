'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/actions/auth';
import { useActionState } from 'react';

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form
      action={action}
      className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
    >
      {/* Error Message */}
      {!!state?.message && (
        <p className="text-red-600 text-sm font-medium text-center mb-3">
          {state.message}
        </p>
      )}

      {/* Name Field */}
      <div className="mb-4">
        <Label htmlFor="name" className="text-gray-700 font-semibold">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {!!state?.errors?.name && (
          <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <Label htmlFor="email" className="text-gray-700 font-semibold">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {!!state?.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <Label htmlFor="password" className="text-gray-700 font-semibold">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          defaultValue={state?.data?.password}
          className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {!!state?.errors?.password && (
          <div className="text-xs text-red-500 mt-1">
            <p className="font-medium">Password must:</p>
            <ul className="list-disc list-inside text-red-400">
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <SubmitButton className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
        Sign Up
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;

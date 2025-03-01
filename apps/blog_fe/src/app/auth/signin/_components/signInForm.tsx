'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/actions/auth';
import { useActionState } from 'react';

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-96"
    >
      {!!state?.message && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded-md">
          {state.message}
        </p>
      )}

      <div className="flex flex-col space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          type="email"
          defaultValue={state?.data.email}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!!state?.errors?.email && (
          <p className="text-red-500 text-xs">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data.password}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!!state?.errors?.password && (
          <p className="text-red-500 text-xs">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold transition-all hover:bg-blue-700 active:scale-95">
        Sign In
      </SubmitButton>
    </form>
  );
};

export default SignInForm;

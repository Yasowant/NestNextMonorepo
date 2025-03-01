import React, { PropsWithChildren } from 'react';

const AuthLayOut = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {children}
    </div>
  );
};

export default AuthLayOut;

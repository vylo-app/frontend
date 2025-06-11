import type { ReactNode } from 'react';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
};

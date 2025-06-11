import { SignUpPage } from '@/pages/SignUp';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
});

function SignUp() {
  return (
    <>
      <SignUpPage />
    </>
  );
}

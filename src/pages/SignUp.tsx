import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { signUpSchema, type SignUpInput } from '@vylo-app/shared-contract';
import { signUp } from '@/api';
import { useAuthStore } from '@/store/auth';

export function SignUpPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<SignUpInput>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const { setAccessToken } = useAuthStore();

  const [errors, setErrors] = useState<Partial<SignUpInput>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
      });
      return;
    }

    setLoading(true);
    try {
      const { accessToken } = await signUp(data);
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      navigate({ to: '/' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 rounded-xl border shadow-md space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input name="firstName" value={data.firstName} onChange={handleChange} />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input name="lastName" value={data.lastName} onChange={handleChange} />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" value={data.email} onChange={handleChange} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={data.password} onChange={handleChange} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <p>
        {'Already have an account?'}{' '}
        <Link className="underline" to="/sign-in">
          Sign In
        </Link>
      </p>
    </div>
  );
}

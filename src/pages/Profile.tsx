import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getProfile, updateProfile } from '@/api';
import { UpdateUserDto } from '@vylo-app/shared-contract';
import { BottomNavigation } from '@/components/BottomNavigation';

export function ProfilePage() {
  const [data, setData] = useState<UpdateUserDto>({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<UpdateUserDto>>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setData({
          firstName: profile.firstName || '',
          lastName: profile.lastName || '',
          email: profile.email || '',
        });
      } catch {
        setApiError('Failed to load profile.');
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setApiError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      await updateProfile(data);
      setSuccessMessage('Profile updated successfully.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-24 p-6 rounded-xl border shadow-md space-y-6 bg-white">
        <h1 className="text-2xl font-bold text-center">Profile</h1>

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

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Update Profile'}
          </Button>
        </form>
      </div>

      <BottomNavigation />
    </>
  );
}

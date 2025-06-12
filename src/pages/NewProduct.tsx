import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createProduct } from '@/api';
import { CreateProductDto } from '@vylo-app/shared-contract';
import { BottomNavigation } from '@/components/BottomNavigation';

export default function NewProductPage() {
  const [data, setData] = useState<CreateProductDto>({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<CreateProductDto>>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: undefined });
    setApiError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError('');
    setSuccessMessage('');

    if (!data.name) setErrors((e) => ({ ...e, name: 'Name is required' }));
    if (!data.description) setErrors((e) => ({ ...e, description: 'Description is required' }));

    if (!data.name || !data.description) {
      setLoading(false);
      return;
    }

    try {
      await createProduct(data);
      setSuccessMessage('Product created successfully.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto mt-24 p-6 rounded-xl border shadow-md space-y-6 bg-white">
        <h1 className="text-2xl font-bold text-center">Create Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={data.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              name="description"
              className="w-full border rounded-md p-2"
              value={data.description}
              onChange={handleChange}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </form>
      </div>

      <BottomNavigation />
    </>
  );
}

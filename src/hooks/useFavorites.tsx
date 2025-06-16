import { useState } from 'react';
import { addFavorite, removeFavorite } from '@/api';

export function useFavorites() {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const add = async (productId: string) => {
    setUpdatingId(productId);
    try {
      await addFavorite(productId);
    } finally {
      setUpdatingId(null);
    }
  };

  const remove = async (productId: string) => {
    setUpdatingId(productId);
    try {
      await removeFavorite(productId);
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    add,
    remove,
    updatingId,
  };
}

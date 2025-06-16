import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import {
  addToOrder,
  fetchProductById,
  removeFromOrder,
  getProductReviews,
  createProductReview,
  deleteProductReview,
} from '@/api';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import {
  type Product,
  type ProductWithMeta,
  type ProductReview,
  type ProductReviewWithMeta,
} from '@vylo-app/shared-contract';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

export function ProductPage() {
  const { productId } = useParams({ from: '/products/$productId' });
  const [product, setProduct] = useState<(Product & ProductWithMeta) | null>(null);
  const [reviews, setReviews] = useState<(ProductReview & ProductReviewWithMeta)[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const [canFavorited, setCanFavorited] = useState<boolean>(false);

  const { add, remove, updatingId } = useFavorites();

  const handleToggleFavorite = async () => {
    if (!product) return;

    try {
      if (canFavorited) {
        await add(product.id);
        setCanFavorited(false);
      } else {
        await remove(product.id);
        setCanFavorited(true);
      }
    } catch {
      alert('Failed to update favorite');
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const productRes = await fetchProductById(productId);
      const reviewRes = await getProductReviews(productId);
      setProduct(productRes);
      setCanFavorited(Boolean(productRes.canFavorited));
      setReviews(reviewRes);
      setLoading(false);
    };
    fetch();
  }, [productId]);

  const handleToggleCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      if (product.isInCart) {
        await removeFromOrder(product.id);
        setProduct({ ...product, isInCart: false });
      } else {
        await addToOrder(product.id);
        setProduct({ ...product, isInCart: true });
      }
    } catch {
      alert('Failed to update cart');
    } finally {
      setAdding(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!feedback.trim()) return;
    try {
      const newReview = await createProductReview({
        productId,
        rating,
        feedback,
      });
      setReviews([newReview, ...reviews]);
      setFeedback('');
      setRating(5);
      setProduct((prev) => (prev ? { ...prev, canReview: false } : prev));
    } catch {
      alert('Failed to submit review');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    setDeletingReviewId(reviewId);
    try {
      await deleteProductReview(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch {
      alert('Failed to delete review');
    } finally {
      setDeletingReviewId(null);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20 text-red-500">Not found</p>;

  return (
    <div
      style={{
        paddingBottom: '55px', // TODO: The 55px is the height of bottom navigation menu
      }}
    >
      <Header />
      <div className="max-w-md mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <Button
          onClick={handleToggleCart}
          disabled={adding}
          className="cursor-pointer mb-6"
          variant={product?.isInCart ? 'outline' : 'default'}
        >
          {adding
            ? product?.isInCart
              ? 'Removing...'
              : 'Adding...'
            : product?.isInCart
              ? 'Remove from Cart'
              : 'Add to Cart'}
        </Button>{' '}
        <Button onClick={handleToggleFavorite} disabled={updatingId === product?.id}>
          {updatingId === product?.id
            ? 'Updating...'
            : canFavorited
              ? 'Add to Favorites'
              : 'Remove from Favorites'}
        </Button>
      </div>

      <section className="max-w-md mx-auto px-4">
        {product.canReview ? (
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Leave a review</h2>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Rating (1-5)"
            />
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback..."
            />
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </div>
        ) : null}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r) => {
            return (
              <div key={r.id} className="border rounded p-3">
                {r.canDelete ? (
                  <div className="flex">
                    <div className="ml-auto" key={r.id}>
                      {' '}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <EllipsisVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => handleDeleteReview(r.id)}
                            disabled={deletingReviewId === r.id}
                          >
                            {deletingReviewId === r.id ? 'Deleting...' : 'Delete Review'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ) : null}

                <div>
                  <p className="font-medium">Rating: {r.rating}/5</p>
                  <p>{r.feedback}</p>
                  {r.user && (
                    <p className="text-sm text-gray-500">
                      — {r.user.firstName || ''} {r.user.lastName || ''}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <BottomNavigation />
    </div>
  );
}

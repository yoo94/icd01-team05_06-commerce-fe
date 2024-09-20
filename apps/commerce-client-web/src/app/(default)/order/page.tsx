import PaymentPageClient from '@/app/(default)/order/components/payment-page-client';
import mswApi from '@/lib/msw-api';
import { CartItem } from '@/types/cart-types';
import { DetailBook } from '@/types/book-types';

interface PaymentPageProps {
  searchParams: { productId?: string };
}

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
  let books: CartItem[] = [];

  if (searchParams.productId) {
    const bookId = Number(searchParams.productId);
    try {
      const book = await mswApi(`books/${bookId}`).json<DetailBook>();
      if (book) {
        const cartItem: CartItem = {
          ...book,
          selectNum: 1,
          selected: true,
          shippingInfo: '무료배송',
          imageUrl: book.coverImage || undefined,
        };
        books = [cartItem];
      }
    } catch (error) {
      console.error('Failed to fetch book:', error);
    }
  }
  return <PaymentPageClient serverBooks={books} />;
};

export default PaymentPage;

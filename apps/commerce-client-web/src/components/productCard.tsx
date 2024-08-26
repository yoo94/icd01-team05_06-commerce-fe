// components/ProductCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  likes: number;
  comments: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageUrl,
  title,
  price,
  likes,
  comments,
  onAddToCart,
}) => {
  return (
    <Link href={`/details/${id}`}>
      <div className="border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-500">{price}원</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-gray-400" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span>{comments}</span>
            </div>
          </div>
          <button onClick={onAddToCart} className="flex items-center space-x-1 text-blue-500">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

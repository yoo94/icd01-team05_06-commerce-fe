'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterComponent from '@/app/components/(filters)/FilterComponent';
import SearchResult from '@/app/components/(searchResult)/SearchResult';
import productsData from '@/data/products.json';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    const searchWord = searchParams.get('SearchWord') || '';
    const priceRange = searchParams.get('price') || '';
    const selectedPublisher = searchParams.get('publisher') || '';
    const selectedCategory = searchParams.get('category') || '';

    let filtered = productsData;

    // SearchWord 필터링
    if (searchWord) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }

    // Price 필터링
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice,
      );
    }

    // Publisher 필터링
    if (selectedPublisher) {
      const publishers = selectedPublisher.split(',');
      filtered = filtered.filter((product) => publishers.includes(product.publisher));
    }

    // Category 필터링
    if (selectedCategory) {
      const categories = selectedCategory.split(',');
      filtered = filtered.filter((product) => categories.includes(product.category.name));
    }
    setFilteredProducts(filtered);
  }, [searchParams]);

  const handleAddToCart = (id: number) => {
    console.log(`Add to cart clicked for product ${id}`);
  };

  const handleBuyNow = (id: number) => {
    console.log(`Buy now clicked for product ${id}`);
  };

  return (
    <div className="flex">
      {/* Sidebar with filters */}
      <div className="w-1/4 p-4">
        <FilterComponent products={productsData} />
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-4">
        <h1 className="mb-4 text-2xl font-bold">Product List</h1>

        {/* Render the search results */}
        <SearchResult
          products={filteredProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
};

export default SearchPage;

'use client';

import { useEffect, useState } from 'react';
import FilterComponent from '@/app/(default)/search/components/(filters)/filter-component';
import SearchResult from '@/app/(default)/search/components/(searchResult)/search-result';
import productsData from '@/data/products.json';

interface SearchPageProps {
  searchParams: {
    SearchWord?: string;
    price?: string;
    publisher?: string;
    category?: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    const searchWord = searchParams.SearchWord ?? '';
    const priceRange = searchParams.price ?? '';
    const selectedPublisher = searchParams.publisher ?? '';
    const selectedCategory = searchParams.category ?? '';

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
      <div className="w-1/5 p-4 hidden lg:block">
        <FilterComponent products={productsData} />
      </div>

      {/* Main content area */}
      <div className="w-full lg:w-4/5 p-4">
        <h1 className="mb-4 text-xl font-bold">상품 목록</h1>

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

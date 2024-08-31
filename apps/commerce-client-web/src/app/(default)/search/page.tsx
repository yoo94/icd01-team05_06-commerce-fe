'use client';

import FilterComponent from '@/app/components/(filters)/FilterComponent';
import SearchResult from '@/app/components/(searchResult)/SearchResult';
import products from '@/data/products.json';

function SearchPage() {
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
        <FilterComponent />
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-4">
        <h1 className="mb-4 text-2xl font-bold">Product List</h1>

        {/* Render the search results */}
        <SearchResult products={products} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
      </div>
    </div>
  );
}

export default SearchPage;

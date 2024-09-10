import { Accordion } from '@/components/ui/accordion';
import PriceFilter from '@/app/(default)/search/components/(filters)/PriceFilter';
import PublisherFilter from '@/app/(default)/search/components/(filters)/PublisherFilter';
import CategoryFilter from '@/app/(default)/search/components/(filters)/CategoryFilter';
import { Product } from '@/types/productTypes';
import { Suspense } from 'react';

const FilterComponent = ({ products }: { products: Product[] }) => {
  const publishers = [...new Set(products.map((product) => product.publisher))];

  return (
    <div className="w-full max-w-md rounded-lg border p-4">
      <Accordion type="multiple" className="w-full">
        <PriceFilter />
        <Suspense fallback="로딩 중..">
          <PublisherFilter publishers={publishers} />
        </Suspense>
        <CategoryFilter products={products} />
      </Accordion>
    </div>
  );
};

export default FilterComponent;

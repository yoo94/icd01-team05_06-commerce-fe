import { Accordion } from '@/components/ui/accordion';
import PriceFilter from '@/app/(default)/search/components/(filters)/PriceFilter';
import PublisherFilter from '@/app/(default)/search/components/(filters)/PublisherFilter';
import CategoryFilter from '@/app/(default)/search/components/(filters)/CategoryFilter';
import { Product } from '@/types/productTypes';

const FilterComponent = ({ products }: { products: Product[] }) => {
  const publishers = [...new Set(products.map((product) => product.publisher))];

  return (
    <div className="w-full max-w-md p-4 border rounded-lg">
      <Accordion type="multiple" className="w-full">
        <PriceFilter />
        <PublisherFilter publishers={publishers} />
        <CategoryFilter products={products} />
      </Accordion>
    </div>
  );
};

export default FilterComponent;

import { ProductCategory } from '@/types/product-types';
import Link from 'next/link';

interface BreadcrumbProps {
  category: ProductCategory;
}

const Breadcrumb = ({ category }: BreadcrumbProps) => {
  // Helper function to extract all category levels
  const getCategoryPath = (category: ProductCategory): ProductCategory[] => {
    const path: ProductCategory[] = [];
    let currentCategory: ProductCategory | undefined = category;

    // Traverse through the category hierarchy to build the path
    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = currentCategory.parentCategory;
    }

    return path;
  };

  const categoryPath = getCategoryPath(category);

  return (
    <nav className="mb-4 text-sm text-gray-500">
      {categoryPath.map((category, index) => (
        <span key={category.id}>
          <Link
            href={{
              pathname: '/search',
              query: {
                category: category.name,
              },
            }}
            passHref
            className="hover:underline"
          >
            {category.name}
          </Link>
          {index < categoryPath.length - 1 && <span className="mx-2">&gt;</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;

import { BookCategory } from '@/types/book-types';
import Link from 'next/link';

interface BreadcrumbProps {
  category: BookCategory;
}

const Breadcrumb = ({ category }: BreadcrumbProps) => {
  // Helper function to extract all category levels
  const getCategoryPath = (category: BookCategory): BookCategory[] => {
    const path: BookCategory[] = [];
    let currentCategory: BookCategory | undefined = category;

    // Traverse through the category hierarchy to build the path
    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = currentCategory.subCategory;
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

import { Category } from '@/types/category-types';
import { Book, BookCategory } from '@/types/book-types';
import { MenuCategory } from '@/types/menu-types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const parseAndRoundPrice = (price: string | number): number => {
  const priceNumber = typeof price === 'number' ? price : parseFloat(price);
  return Math.round(priceNumber / 100) * 100;
};

const calculationDiscountRate = (price: number, discount: number): string => {
  const intergerPrice = Math.floor(price);

  const discountRate = (discount / intergerPrice) * 100;

  return discountRate.toFixed(0);
};

const transformServerCategories = (data: Category): MenuCategory[] => {
  return (
    data.childCategories?.map((category: Category) => ({
      title: category.name,
      items:
        category.childCategories?.map((sub: Category) => ({
          title: sub.name,
          items:
            sub.childCategories?.map((subSub: Category) => ({
              title: subSub.name,
            })) ?? [],
        })) ?? [],
    })) ?? []
  );
};

const hasCategoryName = (category: BookCategory, nameToFind: string): boolean => {
  if (category.name === nameToFind) return true;

  if (category.subCategory) {
    return hasCategoryName(category.subCategory, nameToFind);
  }

  return false;
};

const filterBooksByCategoryName = (books: Book[], categoryName: string): Book[] => {
  return books.filter((book) => hasCategoryName(book.category, categoryName));
};

export {
  cn,
  parseAndRoundPrice,
  calculationDiscountRate,
  transformServerCategories,
  hasCategoryName,
  filterBooksByCategoryName,
};

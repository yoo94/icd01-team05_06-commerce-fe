import { Category } from '@/types/category-types';
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
  const discountRate = ((price - discount) / price) * 100;

  return discountRate.toFixed(0);
};

const transformServerCategories = (data: Category[]): MenuCategory[] => {
  return data.map((category) => ({
    title: category.name,
    items:
      category.childCategories?.map((subCategory) => ({
        id: subCategory.id,
        title: subCategory.name,
        items:
          subCategory.childCategories?.map((subSubCategory) => ({
            title: subSubCategory.name,
          })) ?? [],
      })) ?? [],
  }));
};

export { cn, parseAndRoundPrice, calculationDiscountRate, transformServerCategories };

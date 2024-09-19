interface Category {
  id: number;
  name: string;
  subCategory: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  subCategory?: SubSubCategory[];
}

interface SubSubCategory {
  id: number;
  name: string;
}

export type { Category, SubCategory, SubSubCategory };

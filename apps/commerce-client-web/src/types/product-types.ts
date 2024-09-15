export type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  discount: number;
  publisher: string;
  pubdate: string;
  isbn: string;
  description: string;
  category: {
    id: number;
    name: string;
    parentCategory: {
      id: number;
      name: string;
    };
  };
  pages: number;
  coverImage: string;
  previewLink: string;
  stockQuantity: number;
  rating: number;
  tags: string[];
};

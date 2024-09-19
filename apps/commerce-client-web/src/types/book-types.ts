interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  discount: number;
  publisher: string;
  pubdate: string; // ISO 형식 날짜 문자열
  isbn: string;
  description: string;
  category: BookCategory;
  pages: number;
  coverImage: string;
  previewLink: string;
  stockQuantity: number;
  rating: number;
  tags: string[];
  status: 'WAIT' | 'ON_SALE' | 'CLOSE' | 'OUT_OF_STOCK' | 'SUSPENSION' | 'PROHIBITION';
}

interface BookCategory {
  id: number;
  name: string;
  subCategory?: BookCategory;
}

interface DetailBook extends Book {
  tableOfContents: string;
  authorInfo: string;
  recommendations: string;
}

export type { Book, BookCategory, DetailBook };

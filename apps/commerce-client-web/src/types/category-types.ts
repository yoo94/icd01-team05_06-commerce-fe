export interface Category {
  id: number;
  parentId: number | null;
  name: string;
  depth: number;
  childCategories: Category[] | null;
}

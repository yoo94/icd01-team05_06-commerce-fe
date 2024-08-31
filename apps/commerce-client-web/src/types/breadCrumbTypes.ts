// src/types/breadCrumbTypes.ts

export type BreadCrumbItem = {
  label: string;
  href: string;
};

export type BreadCrumbProps = {
  items: BreadCrumbItem[];
};

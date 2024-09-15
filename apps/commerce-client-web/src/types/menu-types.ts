export interface MenuItem {
  title: string;
  link?: string;
}

export interface Category {
  title: string;
  items?: MenuItem[];
}

export interface MainMenu {
  title: string;
  categories?: Category[];
  link?: string;
}

interface MenuItem {
  title: string;
  link?: string;
  id?: number;
  items?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items?: MenuItem[];
}

interface MainMenu {
  title: string;
  categories?: MenuCategory[];
  type?: string;
}

export type { MenuItem, MenuCategory, MainMenu };

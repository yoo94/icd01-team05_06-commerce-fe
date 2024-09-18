interface MenuItem {
  title: string;
  link?: string;
  items?: MenuItem[];
}

interface MenuCategory {
  title: string;
  items?: MenuItem[];
}

interface MainMenu {
  title: string;
  categories?: MenuCategory[];
  link?: string;
}

export type { MenuItem, MenuCategory, MainMenu };

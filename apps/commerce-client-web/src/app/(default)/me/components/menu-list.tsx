import Link from 'next/link';

interface MenuItem {
  title: string;
  route: string;
}

interface MenuListProps {
  title: string;
  items: MenuItem[];
}

const MenuList = ({ title, items }: MenuListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{title}</span>
      <ul className="flex list-disc flex-col gap-2 pb-5 pl-2 text-xs font-light">
        {items.map((item, i) => (
          <li key={i}>
            <Link href={item.route} className="hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;

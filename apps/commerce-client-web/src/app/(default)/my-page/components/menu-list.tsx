interface MenuListProps {
  title: string;
  items: string[];
}

const MenuList = ({ title, items }: MenuListProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span>{title}</span>
      <ul className="flex list-disc flex-col gap-1 pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;

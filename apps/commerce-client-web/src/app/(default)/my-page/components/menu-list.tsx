interface Props {
  title: string;
  items: string[];
}

export default function MenuList({ title, items }: Props) {
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
}

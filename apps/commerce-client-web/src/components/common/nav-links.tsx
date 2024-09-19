import Link from 'next/link';

type NavLink = {
  href: string;
  label: string;
  onClick?: () => void; // Optional onClick handler
};

type NavLinksProps = {
  links: NavLink[];
  fontSize?: string;
};

const NavLinks = ({ links, fontSize = 'text-sm' }: NavLinksProps) => {
  return (
    <ul className={`flex gap-x-4 font-light text-slate-600 ${fontSize}`}>
      {links.map(({ href, label, onClick }, index) => (
        <li
          key={label}
          className={`relative after:absolute after:-right-2 after:top-0 after:h-full after:border-r after:border-slate-300 after:content-[''] ${
            index === links.length - 1 ? 'last:after:border-0' : ''
          }`}
        >
          {onClick ? (
            <span
              onClick={onClick}
              className="cursor-pointer transition-colors duration-200 hover:font-semibold hover:text-slate-800"
            >
              {label}
            </span>
          ) : (
            <Link
              href={href}
              className="transition-colors duration-200 hover:font-semibold hover:text-slate-800"
            >
              {label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;

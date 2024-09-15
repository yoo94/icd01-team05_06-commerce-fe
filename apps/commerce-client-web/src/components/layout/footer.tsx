import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react'; // Example icons from lucide-react
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Import Select components from shadcn
import NavLinks from '@/components/common/nav-links';

const footerLinks = [
  { href: '#', label: '회사소개' },
  { href: '#', label: '이용약관' },
  { href: '#', label: '개인정보 처리방침' },
  { href: '#', label: '고객센터' },
];

const socialIcons = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter' },
];

const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto flex flex-col gap-y-4 py-10 md:flex-row md:justify-between">
        {/* Left Section: Logo and Links */}
        <div className="flex flex-col gap-y-4">
          <h1>
            <Link href="/" className="hidden md:flex">
              <Image
                src="/images/svg/logo-lg.svg"
                alt="이너북스"
                width={150}
                height={40}
                className="cursor-pointer"
                priority
              />
            </Link>
          </h1>

          {/* Use NavLinks component */}
          <NavLinks links={footerLinks} />

          <span className="text-xs font-light">&copy; INNERBOOKS</span>
        </div>

        {/* Right Section: Additional Information */}
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            {/* Family Site Dropdown using shadcn Select component */}
            <Select>
              <SelectTrigger className="w-[180px] text-xs">
                <SelectValue placeholder="Family Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="text-xs " value="site1">
                  Family Site 1
                </SelectItem>
                <SelectItem className="text-xs" value="site2">
                  Family Site 2
                </SelectItem>
                <SelectItem className="text-xs" value="site3">
                  Family Site 3
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Social Media Icons */}
            {socialIcons.map(({ Icon, label }) => (
              <button key={label} aria-label={label} className="rounded-full border p-2">
                <Icon className="size-4 text-gray-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

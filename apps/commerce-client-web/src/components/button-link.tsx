import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

// Button의 variant와 size 타입을 지정합니다.
type VariantType =
  | 'outline'
  | 'link'
  | 'default'
  | 'destructive'
  | 'secondary'
  | 'ghost'
  | null
  | undefined;
type SizeType = 'lg' | 'default' | 'sm' | 'icon' | null | undefined;

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: VariantType;
  className?: string;
  size?: SizeType;
}

export default function ButtonLink({
  href,
  children,
  variant = 'outline',
  className = '',
  size = 'lg',
}: ButtonLinkProps) {
  return (
    <Link href={href} passHref>
      <Button variant={variant} className={className} size={size}>
        {children}
      </Button>
    </Link>
  );
}

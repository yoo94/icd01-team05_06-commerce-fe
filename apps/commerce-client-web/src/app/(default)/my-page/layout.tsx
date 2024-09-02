import { ReactNode } from 'react';
import SideBar from '@/app/(default)/my-page/orders/components/side-bar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex gap-12">
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

import { ReactNode } from 'react';
import SideBar from './components/side-bar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className=" flex gap-10">
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;

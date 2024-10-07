import { ReactNode } from 'react';
import SideBar from './components/side-bar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-10">
      {/* Sidebar, visible on medium screens and larger */}
      <div className="hidden md:block md:w-1/4">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Layout;

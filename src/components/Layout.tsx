import { Link, Outlet } from "react-router-dom";
import React from "react";

type LayoutProps = {
  hideNav?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ hideNav = false }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!hideNav && (
        <nav className="bg-indigo-700 text-white p-4 shadow">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-lg">
              My Blog
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline hover:text-indigo-200">
                Home
              </Link>
              <Link to="/about" className="hover:underline hover:text-indigo-200">
                About Me
              </Link>
            </div>
          </div>
        </nav>
      )}
      <main className="container mx-auto flex-1 flex items-center justify-center py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

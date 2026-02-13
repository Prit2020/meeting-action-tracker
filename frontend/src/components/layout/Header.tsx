import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subTitle?: string; 
  actions?: ReactNode;
}

const Header = ({ title, subTitle, actions }: HeaderProps) => {
  return (
    <header className="bg-white border-b px-8 py-5">
      <div className="flex items-center justify-between">
        
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {title}
          </h1>

          {subTitle && (
            <p className="text-sm text-gray-500 mt-1">
              {subTitle}
            </p>
          )}
        </div>
        
        {/* To add other things like drop down or search input field, etc in header */}
        {actions && <div>{actions}</div>}
      </div>
    </header>
  );
};

export default Header;
export const MenuItem = ({ onClick, children }) => {
  return (
    <li
      onClick={onClick}
      className="leading-6 cursor-default px-2.5 rounded hover:text-white hover:bg-blue-500 transition-colors"
    >
      {children}
    </li>
  );
};

export const MenuItemGroup = ({ border = true, children }) => {
  const borderClass = !border
    ? "pb-1"
    : "after:content-[''] after:block after:pb-0 after:h-1.5 after:max-w-full after:mx-2 after:border-b after:border-gray-300 dark:after:border-gray-600";
    
  return <ul className={`relative px-1 pt-1 ${borderClass}`}>{children}</ul>;
};

"use client";

import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  let title = "";
  switch (pathname) {
    case "/iCal":
      title = "iCal files";
      break;
    case "/settings":
      title = "Settings";
      break;
    default:
      title = "Generate iCal";
  }

  return (
    <header className="p-4">
      <h1 className="text-xl">{title}</h1>
    </header>
  );
};

export default Header;

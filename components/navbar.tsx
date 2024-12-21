"use client";

import Link from "next/link";
import { CalendarDays, Files, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-64 p-4 flex flex-col">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-wrap">
            Character <br />
            Birthdays <br />
            iCal <br />
            Generator
          </h1>
        </Link>
      </div>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/" className="block hover:bg-main_background p-2 rounded">
            <div className="flex items-center gap-2 text-lg">
              <CalendarDays className="size-4" />
              Generate iCal
            </div>
          </Link>
        </li>
        <li>
          <Link
            href="/iCal"
            className="block hover:bg-main_background p-2 rounded"
          >
            <div className="flex items-center gap-2 text-lg">
              <Files className="size-4" />
              iCal Files
            </div>
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <div>
          <Link
            href="/settings"
            className="block hover:bg-main_background p-2 rounded"
          >
            <div className="flex items-center gap-2 text-lg">
              <Settings className="size-4" />
              Settings
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

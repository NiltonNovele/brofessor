"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Info,
  Users,
  BookOpen,
  UserCheck,
} from "lucide-react";


const navItems = [
  { label: "Home", href: "/", Icon: Home },
  { label: "About", href: "/about", Icon: Info },
  { label: "Companions", href: "/companions", Icon: Users },
  { label: "Practice", href: "/practice", Icon: BookOpen },
  { label: "My Journey", href: "/my-journey", Icon: UserCheck },
];

const NavItems = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={`flex ${className}`}>
      {navItems.map(({ label, href, Icon }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-orange-100 transition-colors",
            pathname === href ? "text-primary font-semibold" : "text-gray-700",
          )}
        >
          <Icon size={18} />
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;

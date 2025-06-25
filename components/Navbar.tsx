"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const UserButton = dynamic(() => import("@clerk/nextjs").then(mod => mod.UserButton), {
  ssr: false,
});


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar flex justify-between items-center px-4 py-3 shadow-md bg-white">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/logo.png" alt="logo" width={46} height={44} />
          <span className="font-semibold text-lg">BroFessor</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
      {isMobileMenuOpen && (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    className="absolute top-[72px] left-0 w-full bg-white shadow-md z-50 flex flex-col gap-2 px-4 py-5 sm:hidden overflow-hidden"
  >
    <NavItems className="flex-col" />
    <SignedOut>
      <SignInButton>
        <button className="btn-signin w-full text-left">Sign In</button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </motion.div>
)}
</AnimatePresence>
    </nav>
  );
};

export default Navbar;

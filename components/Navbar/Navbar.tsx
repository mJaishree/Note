"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import LogoutDialog from "@/components/Logout/LogoutDialog";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    router.push("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

 
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  
  const getLinkClasses = (href: string) => {
    const baseClasses = "text-[#0E3B4C] font-bold text-sm sm:text-base px-3 py-2 rounded-md transition-colors duration-200";
    const activeClasses = "bg-[#D4B5A0]";
    
    return isActiveLink(href) 
      ? `${baseClasses} ${activeClasses}` 
      : `${baseClasses} hover:bg-[#D4B5A0] hover:bg-opacity-50`;
  };

 
  const shouldHideNavigation = pathname === "/" || pathname === "/signup";
  
 
  const shouldHideAuthLinks = pathname === "/notes" || pathname === "/about";

  return (
    <>
      <nav className="bg-[#A3D3D8] border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
       
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-[#0E3B4C] mb-3 sm:mb-0"
          >
            Keep NOTES
          </Link>

        
          {!shouldHideNavigation && (
            <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-3 sm:space-x-6">
              <Link
                href="/about"
                className={getLinkClasses("/about")}
              >
                About
              </Link>
              <Link
                href="/notes"
                className={getLinkClasses("/notes")}
              >
                Notes
              </Link>
              
           
              {!shouldHideAuthLinks && (
                <>
                  <Link
                    href="/signup"
                    className={getLinkClasses("/signup")}
                  >
                    Account
                  </Link>
                  <Link
                    href="/"
                    className={getLinkClasses("/")}
                  >
                    Login
                  </Link>
                </>
              )}
              
            
              <button
                onClick={handleLogoutClick}
                className="text-[#0E3B4C] hover:text-red-600 transition-colors duration-200 p-1"
                title="Logout"
              >
                <FiLogOut className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>
      </nav>

     
      <LogoutDialog
        isOpen={showLogoutDialog}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </>
  );
}

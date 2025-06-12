import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#A3D3D8] border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-[#0E3B4C] mb-3 sm:mb-0"
        >
          Keep NOTES
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-end space-x-3 sm:space-x-6">
          <Link
            href="/about"
            className="text-[#0E3B4C] font-bold text-sm sm:text-base"
          >
            About
          </Link>
          <Link
            href="/notes"
            className="text-[#0E3B4C] font-bold text-sm sm:text-base"
          >
            Notes
          </Link>
          <Link
            href="/signup"
            className="text-[#0E3B4C] font-bold text-sm sm:text-base"
          >
            Account
          </Link>
          <Link
            href="/"
            className="text-[#0E3B4C] font-bold text-sm sm:text-base"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

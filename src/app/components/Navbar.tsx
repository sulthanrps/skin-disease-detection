import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-[#FEF6F8]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img src="/logo.png" alt="logo" className="w-16 h-16" />

          <div className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="text-[#0B134A] hover:text-[#FF3E99] transition-colors">
              Fitur
            </a>
            <a href="#faq" className="text-[#0B134A] hover:text-[#FF3E99] transition-colors">
              FAQ
            </a>
            <a href="#tentang" className="text-[#0B134A] hover:text-[#FF3E99] transition-colors">
              Tentang
            </a>
          </div>

          <a href="/auth" className="hidden md:block bg-[#FF3E99] text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Login
          </a>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#0B134A] focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#FEF6F8]">
          <a href="#fitur" className="block py-2 px-6 text-sm text-[#0B134A] hover:bg-[#FF3E99]/20">
            Fitur
          </a>
          <a href="#faq" className="block py-2 px-6 text-sm text-[#0B134A] hover:bg-[#FF3E99]/20">
            FAQ
          </a>
          <a href="#tentang" className="block py-2 px-6 text-sm text-[#0B134A] hover:bg-[#FF3E99]/20">
            Tentang
          </a>
          <div className="px-6 py-4">
            <a href="/auth" className="block text-center bg-[#FF3E99] text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

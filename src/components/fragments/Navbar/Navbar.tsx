import GrearMarket from "@/components/core/Label/GrearMarket";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from "react-icons/fi";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "@/components/core/Dropdown/ProfileDropdown";

interface UserData {
  email: string;
  expiresAt: Date;
  name: string;
  user_id: string;
}

function buttonLogin() {
  return (
    <div className="hidden gap-4 lg:flex">
      <Link href="/auth/sign-in">
        <button className="text-md rounded-full border border-blue-500 px-4 py-1 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white">
          Sign In
        </button>
      </Link>
      <Link href="/auth/sign-up">
        <button className="text-md rounded-full bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600">
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const session = localStorage.getItem("userSession");
  useEffect(() => {
    setIsMobileMenuOpen(false);
    if (session) {
      const userData = JSON.parse(session);
      setUserData(userData);
    }
  }, [session]);

  const router = useRouter();

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      router.push(`/search_list/${searchKeyword}`);
    } else {
      router.push(`/search_list/`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-[#f4f1eb] shadow-lg">
      <div className="mx-6 flex items-center justify-between py-4 lg:mx-20">
        <div className="flex items-center">
          <GrearMarket />

          <div className="ml-5 hidden gap-6 text-black lg:flex">
            <Link href="/">
              <p className="hover:text-blue-500 hover:duration-700">Home</p>
            </Link>
            <Link href="/contact">
              <p className="hover:text-blue-500 hover:duration-700">Contact</p>
            </Link>
            {session && (
              <Link href="/invoice">
                <p className="hover:text-blue-500 hover:duration-700">
                  Transaction Details
                </p>
              </Link>
            )}
            <Link href="/chatbot">
              <p className="hover:text-blue-500 hover:duration-700">Chatbot</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden w-[350px] items-center md:flex">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full max-w-[350px] rounded-full border bg-gray-100 px-5 py-2 text-sm focus:outline-none"
            />
            <FiSearch
              onClick={handleSearch}
              className="absolute right-3 text-gray-500"
            />
          </div>

          {session && (
            <div className="flex items-center gap-4 text-lg text-black">
              <Link href="/keranjang">
                <FiShoppingCart className="cursor-pointer" />
              </Link>

              <ProfileDropdown />
            </div>
          )}

          <div className="hidden h-[40px] w-[1.5px] rounded-md bg-black lg:block"></div>

          {session && userData ? <p>{userData.name}</p> : buttonLogin()}

          <div className="lg:hidden">
            <FiMenu
              onClick={toggleMobileMenu}
              className="cursor-pointer text-xl"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 h-full bg-[#f4f1eb] shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0 transform"
            : "translate-x-full transform"
        } z-50 w-64`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <GrearMarket />
          <FiX onClick={toggleMobileMenu} className="cursor-pointer text-xl" />
        </div>

        <div className="flex h-[calc(100vh-64px)] flex-col space-y-4 overflow-y-auto p-6 text-black">
          <Link href="/">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Home
            </p>
          </Link>
          <Link href="/contact">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Contact
            </p>
          </Link>
          <Link href="/invoice">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Transaction Details
            </p>
          </Link>
          <Link href="/chatbot">
            <p
              onClick={toggleMobileMenu}
              className="hover:text-blue-500 hover:duration-700"
            >
              Chatbot
            </p>
          </Link>

          <div className="mt-4 flex flex-col gap-4">
            <Link href="/auth/sign-in">
              <button
                onClick={toggleMobileMenu}
                className="text-md w-full rounded-full border border-blue-500 px-4 py-1 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
              >
                Sign In
              </button>
            </Link>
            <Link href="/auth/sign-up">
              <button
                onClick={toggleMobileMenu}
                className="text-md w-full rounded-full bg-blue-500 px-4 py-1 text-white transition duration-300 hover:bg-blue-600"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

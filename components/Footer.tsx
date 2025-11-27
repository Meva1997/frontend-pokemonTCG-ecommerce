import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1A1F] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20Z"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path d="M4 24H44" stroke="currentColor" strokeWidth="4" />
              </svg>
              <span className="text-xl font-bold text-white">
                PokeTCG Store
              </span>
            </Link>
          </div>

          {/* Links Section */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Store Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Store
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/products"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Single Cards
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Booster Boxes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Information Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Information
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="https://github.com/Meva1997"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/alex-fullstack-developer/"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Linkedin
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://frontend-developer-next.vercel.app/"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            © {new Date().getFullYear()} PokeTCG Store - Alejandro Medina. All
            rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center mt-4 sm:mt-0 space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">We accept:</span>

              {/* Visa */}
              <div className="bg-white rounded px-2 py-1">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <rect width="40" height="16" fill="#1A1F71" />
                  <path
                    d="M16.1 11.8L18.1 4.2H20.7L18.7 11.8H16.1Z"
                    fill="white"
                  />
                  <path
                    d="M28.9 4.2L26.7 9.6L26.2 7.4L25.1 4.9C24.9 4.4 24.5 4.2 24 4.2H19.4L19.3 4.4C20.3 4.7 21.2 5.1 21.9 5.6L23.7 11.8H26.4L30.9 4.2H28.9Z"
                    fill="white"
                  />
                  <path
                    d="M11.4 4.2H8.8C8.3 4.2 7.9 4.5 7.8 4.9L5.6 11.8H8.3L8.8 10.4H12L12.2 11.8H14.6L12.8 4.2H11.4ZM9.6 8.4L10.6 5.9L11.2 8.4H9.6Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Mastercard */}
              <div className="bg-white rounded px-2 py-1">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <circle cx="15" cy="8" r="6" fill="#FF5F00" />
                  <circle cx="25" cy="8" r="6" fill="#EB001B" />
                  <circle cx="20" cy="8" r="6" fill="#FF5F00" />
                </svg>
              </div>

              {/* PayPal */}
              <div className="bg-white rounded px-2 py-1">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
                  <path
                    d="M8.5 2H13.5C15.2 2 16.5 3.3 16.5 5C16.5 6.7 15.2 8 13.5 8H11L10 14H7L8.5 2Z"
                    fill="#003087"
                  />
                  <path
                    d="M18 6H23C24.7 6 26 7.3 26 9C26 10.7 24.7 12 23 12H20.5L19.5 18H16.5L18 6Z"
                    fill="#009CDE"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col mt-6">
          <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
            Disclaimer
          </h3>
          <p className="mt-4 text-sm text-gray-400">
            <span className="text-purple-800 font-medium text-lg">
              Please note:
            </span>{" "}
            This website is a personal project and is not affiliated with or
            endorsed by The Pokémon Company or any of its subsidiaries. All
            Pokémon trademarks and copyrights are the property of their
            respective owners. This site is intended for educational and
            entertainment purposes only. Thank you for understanding. Images
            used in the shop are shown solely to demonstrate the project and for
            non-commercial, illustrative purposes. This project is strictly a
            personal portfolio demonstration of my skills and is not intended
            for commercial use. This notice is for informational purposes and
            does not constitute legal advice. I do not intend to claim,
            reproduce, or profit from anyone else&#39;s work; if you believe any
            content on this site improperly uses your work, please contact me
            and I will promptly address it.
          </p>
        </div>
      </div>
    </footer>
  );
}

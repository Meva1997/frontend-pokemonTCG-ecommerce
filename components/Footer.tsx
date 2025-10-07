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
                      href="/products/single-cards"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Single Cards
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/booster-boxes"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Booster Boxes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/accessories"
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
                    <Link
                      href="/privacy-policy"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-of-service"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/contact"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping-returns"
                      className="text-base text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      Shipping & Returns
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social Media Links */}
              <div className="flex flex-col items-start lg:items-end">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Follow Us
                </h3>
                <div className="flex space-x-4 mt-4">
                  {/* Twitter */}
                  <Link
                    href="https://twitter.com/poketcgstore"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 256 256"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                    </svg>
                  </Link>

                  {/* Instagram */}
                  <Link
                    href="https://instagram.com/poketcgstore"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 256 256"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                    </svg>
                  </Link>

                  {/* Facebook */}
                  <Link
                    href="https://facebook.com/poketcgstore"
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      height="24"
                      viewBox="0 0 256 256"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            © 2024 PokeTCG Store. All rights reserved.
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
      </div>
    </footer>
  );
}

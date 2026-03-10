export default function ShippingInfo() {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#8013ec]/20 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-4 h-4 text-[#8013ec]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-white">
          Shipping Information
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col" htmlFor="name">
          <span className="text-white text-sm font-medium leading-normal pb-2">
            Full Name
          </span>
          <input
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
            placeholder="Ash Ketchum"
            id="name"
            name="name"
          />
        </label>
        <label className="flex flex-col" htmlFor="address">
          <span className="text-white text-sm font-medium leading-normal pb-2">
            Address
          </span>
          <input
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
            placeholder="Palet Town, 151"
            id="address"
            name="address"
          />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex flex-col" htmlFor="city">
            <span className="text-white text-sm font-medium leading-normal pb-2">
              City
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="Palet Town"
              id="city"
              name="city"
            />
          </label>
          <label className="flex flex-col" htmlFor="postalCode">
            <span className="text-white text-sm font-medium leading-normal pb-2">
              Postal Code
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="12345"
              id="postalCode"
              name="postalCode"
            />
          </label>
          <label className="flex flex-col" htmlFor="country">
            <span className="text-white text-sm font-medium leading-normal pb-2">
              Country
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="Kanto"
              id="country"
              name="country"
            />
          </label>
        </div>
        <label className="flex flex-col" htmlFor="phone">
          <span className="text-white text-sm font-medium leading-normal pb-2">
            Phone Number
          </span>
          <input
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
            placeholder="123-456-7890"
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </label>
      </div>
    </section>
  );
}

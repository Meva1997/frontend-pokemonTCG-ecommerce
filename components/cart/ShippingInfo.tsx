export default function ShippingInfo() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
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
        <div>
          <label htmlFor="phone">
            <span>Phone Number</span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="123-456-7890"
              id="phone"
              name="phone"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

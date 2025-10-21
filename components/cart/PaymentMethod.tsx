import Image from "next/image";

export default function PaymentMethod() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Payment Method</h2>
      <div className="rounded-lg border border-[#302839] bg-[#211c27] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 bg-white p-1 rounded-md">
              <Image
                alt="Stripe"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuzuxS8fX4aelMJWU31bkhDhMr85cUffXPysieXEnYHDt_0ts34-L78G1DMl-G8D6Ab8sho-rL6H0kSl6S4wOrYZBQ8TF_FF99bDOcaJQlxO4Slo45P94gB778K6LF0qgqqbPpqUa3o1RTZBk2yMu3X4JLqykRKa7PUj8U66tV6iW4BCAX_FjPSz25qY-uZRfaW3UgrwC2KTjrvvB-yx_kKLzua1DUJ5UP5Kdv1n1aFmuekiLbDhuosy_vFRYJlWMEKH1lQSYOJaLy"
                width={32}
                height={32}
                className="h-6 w-auto"
              />
            </div>
            <span className="text-white">Pay securely with Stripe</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <label className="flex flex-col">
            <span className="text-white text-sm font-medium leading-normal pb-2">
              Card Number
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="•••• •••• •••• ••••"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-white text-sm font-medium leading-normal pb-2">
                Expiration Date
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
                placeholder="MM / YY"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white text-sm font-medium leading-normal pb-2">
                CVC
              </span>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
                placeholder="123"
              />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="text-white text-sm font-medium leading-normal pb-2">
              Name on Card
            </span>
            <input
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-0 border border-[#302839] bg-[#211c27] focus:border-[#8013ec] h-12 placeholder:text-[#ab9db9] px-4 py-2 text-base font-normal leading-normal"
              placeholder="Ash Ketchum"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

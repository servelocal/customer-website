import BusinessHoursDropdown from '@/components/BusinessHoursDropdown/BusinessHoursDropdown';
import { AddressType, BusinessHoursProps, Price } from '@/types';

type Props = {
  price: Price[];
  website: string;
  address: AddressType;
  businessHours: BusinessHoursProps;
  duration: string;
};

export default function SidePanel({ price, website, address, businessHours }: Props) {
  return (
    <div className="flex h-auto w-full flex-1 flex-col gap-6 rounded-xl border-1 border-gray-300 p-5">
      <div>
        <h1 className="text-2xl font-semibold">From £{price[0].amount}</h1>
        <p className="mt-1 text-sm text-gray-500">Per Adult</p>
      </div>

      <BusinessHoursDropdown businessHours={businessHours} />
      <div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${address.street},+${address.city},+${address.postcode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded border border-black px-4 py-2 text-center text-lg text-black"
        >
          Get Directions
        </a>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block w-full rounded bg-black px-4 py-2 text-center text-lg text-white"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}

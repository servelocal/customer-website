import { notFound } from 'next/navigation';
import Image from 'next/image';
import activitiesData from '@/data/activities.json';
import { Activity, Price } from '@/types';
import { ActivityDetailParams } from '@/types/pageParams';

const ActivityDetailPage = async ({ params }: { params: ActivityDetailParams }) => {
  const { activity_slug } = await params;

  const activity = activitiesData.activities.find((act: Activity) => act.slug === activity_slug);

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderSection activity={activity} />
      <TagsSection tags={activity.tags} />
      <div className="flex flex-col items-start gap-6 md:flex-row">
        <div className="flex-2">
          <DetailSection title="Description" content={activity.description} />
          <DetailSection
            title="Address"
            content={`${activity.address.street}, ${activity.address.city}, ${activity.address.postcode}, ${activity.address.country}`}
          />
          <ContactSection contact={activity.contact} />
          <OpeningTimesSection openingTimes={activity.details.openingTimes} />
          <h2 className="mb-2 text-xl font-semibold">Price</h2>
          {activity.details.price.map((price: Price, index: number) => (
            <PriceSection key={index} price={price} />
          ))}
        </div>
        <SidePanel
          price={activity.details.price[0].amount}
          website={activity.contact.website}
          address={activity.address}
        />
      </div>
    </div>
  );
};

const SidePanel = ({ price, website, address }: { price: any; website: string; address: any }) => (
  <div className="h-auto flex-1 rounded-lg border-1 border-gray-200 p-4">
    <h1 className="text-2xl font-semibold">From £{price}</h1>
    <p className="mt-1 text-sm text-gray-500">Per Adult</p>
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${address.street},+${address.city},+${address.postcode}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-block w-full rounded border border-black px-4 py-2 text-center text-lg text-black"
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
);

const HeaderSection = ({ activity }: { activity: Activity }) => (
  <div className="relative mb-6">
    <Image
      src={activity.details.bannerImage}
      alt={activity.name}
      width={1200}
      height={600}
      className="h-96 w-full rounded-lg object-cover"
      style={{
        maxWidth: '100%',
      }}
    />
    <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-lg bg-white p-5 shadow-md">
      <Image
        src={activity.details.thumbnailImage}
        alt={`${activity.name} thumbnail`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <div>
        <h1 className="text-2xl font-bold">{activity.name}</h1>
        <p className="text-sm font-medium text-gray-500">{activity.sub_category}</p>
        <p className="text-sm font-medium text-gray-700">{activity.category}</p>
      </div>
    </div>
  </div>
);

const TagsSection = ({ tags }: { tags: string[] }) => (
  <div className="mb-6">
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="text-md rounded bg-gray-100 px-3 py-1 text-black/80">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const DetailSection = ({ title, content }: { title: string; content: string }) => (
  <div className="mb-6">
    <h2 className="mb-2 text-xl font-semibold">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

const ContactSection = ({ contact }: { contact: Activity['contact'] }) => (
  <div className="mb-6">
    <h2 className="mb-2 text-xl font-semibold">Contact</h2>
    <p className="text-gray-700">Phone: {contact.phone}</p>
    <a
      href={contact.website}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      Visit Website
    </a>
  </div>
);

const OpeningTimesSection = ({
  openingTimes,
}: {
  openingTimes: Activity['details']['openingTimes'];
}) => {
  const filteredOpeningTimes = Object.entries(openingTimes).filter(
    ([, time]) => time !== undefined
  );

  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Opening Times</h2>
      {filteredOpeningTimes.length > 0 ? (
        <ul className="ml-6 list-disc">
          {filteredOpeningTimes.map(([day, time]) => (
            <li key={day} className="text-gray-700">
              {day}: {time}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Opening times not available.</p>
      )}
    </div>
  );
};

const PriceSection = ({ price }: { price: Price }) => (
  <div className="mb-1">
    <p className="text-gray-700">
      {price.type}: {price.amount} {price.currency}
    </p>
  </div>
);

export default ActivityDetailPage;

import { notFound } from 'next/navigation';
import Image from 'next/image';
import activitiesData from '@/data/activities.json';
import { Activity } from '@/types';

// interface ActivityDetailPageProps {
//   params: { activity_id: string };
// }

// ActivityDetailPageParams;

type ActivityDetailParams = Promise<{ location: string; activity_id: string }>;

const ActivityDetailPage = async ({ params }: { params: ActivityDetailParams }) => {
  const { activity_id: activityId } = await params;

  const activity = activitiesData.activities.find(
    (act: Activity) => act.activity_id.toString() === activityId
  );

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-12 p-4">
      <HeaderSection activity={activity} />
      <TagsSection tags={activity.tags} />
      <DetailSection title="Description" content={activity.description} />
      <DetailSection title="Address" content={activity.address} />
      <ContactSection contact={activity.contact} />
      <OpeningTimesSection openingTimes={activity.details.openingTimes} />
      <DetailSection title="Price Range" content={activity.details.priceRange} />
    </div>
  );
};

const HeaderSection = ({ activity }: { activity: Activity }) => (
  <div className="relative mb-6">
    <Image
      src={activity.details.bannerImage}
      alt={activity.name}
      width={1200}
      height={600}
      className="h-96 w-full rounded-lg object-cover"
    />
    <div className="absolute bottom-6 left-6 flex items-center gap-4 rounded-lg bg-white p-5 shadow-md">
      <Image
        src={activity.details.thumbnailImage}
        alt={`${activity.name} thumbnail`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
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
        <span key={tag} className="text-md rounded bg-black/10 px-3 py-1 text-black/80 shadow-sm">
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
  openingTimes: Record<string, string | undefined>;
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

export default ActivityDetailPage;

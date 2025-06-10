import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CiTimer, CiLocationOn, CiPhone } from 'react-icons/ci';
import activitiesData from '@/data/activities.json';
import { ActivityProps } from '@/types';
import { ActivityDetailParams } from '@/types/pageParams';
import SidePanel from '@/features/SidePanel/SidePanel';
import Line from '@/components/Line';

const ActivityDetailPage = async ({ params }: { params: ActivityDetailParams }) => {
  const { activity_slug } = await params;

  const activity = activitiesData.activities.find(
    (act: ActivityProps) => act.slug === activity_slug
  );

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderSection activity={activity} />
      <div className="mb-20 flex flex-col-reverse items-start gap-10 md:flex-row">
        <div className="flex flex-3 flex-col gap-2">
          <TagsSection tags={activity.tags} />
          <DetailSection title="Description" content={activity.description} />
          <Line />
          <div className="flex justify-between gap-5">
            <Insight title={'Contacts'} icon={<CiPhone size={28} />}>
              <p>{activity.contact.phone}</p>
            </Insight>
            <Insight title={'Duartion'} icon={<CiTimer size={28} />}>
              {activity.duration}
            </Insight>
            <Insight title={'Location'} icon={<CiLocationOn size={28} />}>
              <p>
                {activity.address.street}, {activity.address.postcode}
              </p>
              <p>
                {activity.address.city}, {activity.address.country}
              </p>
            </Insight>
          </div>
        </div>
        <SidePanel
          price={activity.price}
          website={activity.contact.website}
          address={activity.address}
          businessHours={activity.businessHours}
          duration={activity.duration}
        />
      </div>
    </div>
  );
};

const HeaderSection = ({ activity }: { activity: ActivityProps }) => (
  <div className="relative mb-8">
    <Image
      src={activity.bannerImage}
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
        src={activity.thumbnailImage}
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
        <p className="text-sm font-medium text-gray-500">{activity.subCategory}</p>
        <p className="text-sm font-medium text-gray-700">{activity.category}</p>
      </div>
    </div>
  </div>
);

const TagsSection = ({ tags }: { tags: string[] }) => (
  <div className="mb-4">
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
  <div className="">
    <h2 className="mb-2 text-xl font-semibold">{title}</h2>
    <p className="text-gray-700">{content}</p>
  </div>
);

const Insight = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-1 flex-col gap-1 rounded-xl bg-gray-100 p-4">
    {icon}
    <h2 className="mt-2 font-semibold">{title}</h2>
    <div className="text-gray-500">{children}</div>
  </div>
);

export default ActivityDetailPage;

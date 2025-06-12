import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CiTimer, CiLocationOn, CiPhone } from 'react-icons/ci';
import activitiesData from '@/data/activities.json';
import { ActivityProps } from '@/types';
import { ActivityDetailParams } from '@/types/pageParams';
import SidePanel from '@/features/SidePanel/SidePanel';
import Line from '@/components/Line';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

const ActivityDetailPage = async ({ params }: { params: ActivityDetailParams }) => {
  const { activity_slug } = await params;

  const activity = activitiesData.activities.find(
    (act: ActivityProps) => act.slug === activity_slug
  );

  if (!activity) {
    notFound();
  }

  return (
    <div className="container mx-auto flex flex-col gap-12 p-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <ImageGallery images={activity.images} slug={activity.slug} />
        </div>
        <div className="gap- flex flex-1 flex-col items-center justify-center">
          <Image
            src={`/images/${activity.slug}/${activity.thumbnailImage}`}
            alt={`${activity.name} thumbnail`}
            width={100}
            height={100}
            className="h-34 w-34 rounded-full object-cover"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <h1 className="text-4xl font-bold">{activity.name}</h1>
          <p className="text-2xl font-medium text-gray-500">{activity.subCategory}</p>
          <p className="text-lg font-medium text-gray-700">{activity.category}</p>
        </div>
      </div>
      <div className="mb-20 flex flex-col-reverse items-start gap-10 md:flex-row">
        <div className="flex flex-3 flex-col gap-2">
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

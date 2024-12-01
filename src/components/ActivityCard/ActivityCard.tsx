import Link from 'next/link';
import Image from 'next/image';

interface ActivityCardProps {
  activity_id: number;
  name: string;
  priceRange: string;
  thumbnailImage: string;
  bannerImage: string;
}

const ActivityCard = ({
  activity_id,
  name,
  priceRange,
  thumbnailImage,
  bannerImage,
}: ActivityCardProps) => (
  <Link href={`/city/portsmouth/activities/${activity_id}`}>
    <div className="cursor-pointer overflow-hidden rounded-2xl p-3 transition-all hover:shadow-lg">
      <Image
        src={bannerImage}
        alt={name}
        width={800}
        height={400}
        className="h-48 w-full rounded-3xl object-cover"
      />
      <div className="flex items-center bg-white p-4">
        <div>
          <h3 className="text-xl font-extrabold">{name}</h3>
          <p className="text-sm font-semibold text-gray-700">{priceRange}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default ActivityCard;

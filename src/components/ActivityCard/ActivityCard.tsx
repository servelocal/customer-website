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
    <div className="transform cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform hover:scale-95">
      <Image
        src={bannerImage}
        alt={name}
        width={800}
        height={400}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="flex items-center bg-white p-4">
        <Image
          src={thumbnailImage}
          alt={name}
          width={80}
          height={80}
          className="mr-4 h-20 w-20 rounded-xl border-4 border-white object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-semibold text-gray-700">{priceRange}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default ActivityCard;

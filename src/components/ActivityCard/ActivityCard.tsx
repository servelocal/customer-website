import ActivityCardClient from './ActivityCardClient';

interface ActivityCardProps {
  activity_id: number;
  name: string;
  priceRange: string;
  thumbnailImage: string;
  bannerImage: string;
  subCategory: string;
}

const ActivityCard = (props: ActivityCardProps) => {
  return <ActivityCardClient {...props} />;
};

export default ActivityCard;

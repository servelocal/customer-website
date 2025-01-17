import { Activity } from '@/types';
import ActivityCard from '../ActivityCard';

interface CategorySectionProps {
  category: string;
  activities: Activity[];
}

const CategorySection = ({ category, activities }: CategorySectionProps) => (
  <div className="mb-8">
    <h2 className="mb-2 text-2xl font-semibold">{category}</h2>
    <div className="flex gap-4">
      {activities.map(
        ({
          activity_id,
          slug,
          name,
          sub_category,
          details: { bannerImage, thumbnailImage, price },
          coordinates,
        }) => (
          <ActivityCard
            key={activity_id}
            slug={slug}
            name={name}
            price={price}
            thumbnailImage={thumbnailImage}
            bannerImage={bannerImage}
            subCategory={sub_category}
            coordinates={coordinates}
          />
        )
      )}
    </div>
  </div>
);

export default CategorySection;

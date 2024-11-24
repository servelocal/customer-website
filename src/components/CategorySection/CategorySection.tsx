import ActivityCard from '../ActivityCard';

interface CategorySectionProps {
  category: string;
  activities: {
    activity_id: number;
    name: string;
    details: { bannerImage: string; thumbnailImage: string; priceRange: string };
  }[];
}

const CategorySection = ({ category, activities }: CategorySectionProps) => (
  <div className="mb-8">
    <h2 className="mb-2 text-2xl font-semibold">{category}</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {activities.map(
        ({ activity_id, name, details: { bannerImage, thumbnailImage, priceRange } }) => (
          <ActivityCard
            key={activity_id}
            activity_id={activity_id}
            name={name}
            priceRange={priceRange}
            thumbnailImage={thumbnailImage}
            bannerImage={bannerImage}
          />
        )
      )}
    </div>
  </div>
);

export default CategorySection;

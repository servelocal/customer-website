import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import data from '@/data/activities.json';
import { Activity } from '@/types';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';

const categoriseActivities = (activities: Activity[]): Record<string, Activity[]> => {
  return activities.reduce((acc: Record<string, Activity[]>, activity) => {
    acc[activity.category] = acc[activity.category] || [];
    acc[activity.category].push(activity);
    return acc;
  }, {});
};

const fetchActivities = async (location: string): Promise<Record<string, Activity[]>> => {
  const lowercasedCity = location.toLowerCase();
  if (data.location.toLowerCase() === lowercasedCity) {
    return categoriseActivities(data.activities);
  }
  return {};
};

const ActivitiesPage = async ({ params }: { params: { location: string } }) => {
  const { location } = await params;

  const activities = await fetchActivities(location);

  return (
    <>
      <Banner
        title={`Activities in ${capitalise(location)}`}
        subtitle="Discover amazing services and activities in your area"
        backgroundImage={DEFAULT_BACKGROUND_IMAGE}
      />
      <div className="container mx-auto p-4">
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(([category, activities]) => (
            <CategorySection
              key={category}
              category={capitalise(category)}
              activities={activities}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;

import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { Activity, TagGroup } from '@/types';
import { ActivitiesPageParams } from '@/types/pageParams';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';

// Categorise activities based on tag groups
const categoriseByTagGroups = (
  activities: Activity[],
  tagGroups: TagGroup[]
): Record<string, Activity[]> => {
  return tagGroups.reduce((acc: Record<string, Activity[]>, group) => {
    acc[group.title] = activities.filter((activity) =>
      activity.tags.some((tag) => group.tags.includes(tag))
    );
    return acc;
  }, {});
};

// Fetch activities and group them by tag groups
const fetchActivities = async (location: string): Promise<Record<string, Activity[]>> => {
  const lowercasedCity = location.toLowerCase();

  // Check against the 'location' property
  if (activitiesData.location.toLowerCase() === lowercasedCity) {
    return categoriseByTagGroups(activitiesData.activities, tagGroupsData.tagGroups);
  }

  return {};
};

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
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
          Object.entries(activities).map(([tagGroupTitle, activities]) => (
            <CategorySection key={tagGroupTitle} category={tagGroupTitle} activities={activities} />
          ))
        ) : (
          <p className="text-center text-gray-500">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;

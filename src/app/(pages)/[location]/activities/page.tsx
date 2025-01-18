import Banner from '@/components/Banner';
import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import fetchActivities from '@/utils/fetchActivities';
import { ActivitiesPageParams } from '@/types/pageParams';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const activities = await fetchActivities(location);

  return (
    <>
      {/* Banner Section */}
      <Banner
        title={`Activities in ${capitalise(location)}`}
        subtitle="Discover amazing services and activities in your area"
        backgroundImage={DEFAULT_BACKGROUND_IMAGE}
      />

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(([tagGroup, { activities: groupActivities, tags }]) => (
            <CategorySection
              key={tagGroup}
              category={capitalise(tagGroup)}
              tags={tags}
              activities={groupActivities}
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

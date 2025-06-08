import TagGroup from '@/components/TagGroup';
import CategorySection from '@/components/CategorySection/CategorySection';
import Carousel from '@/components/Carousel';
import { capitalise } from '@/utils/capitalise';
import fetchActivities from '@/utils/fetchActivities';
import { ActivitiesPageParams } from '@/types/pageParams';
import slidesData from '@/data/carousel.json';

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);

  const categoriesData = await categoriesRes.json();

  const activities = await fetchActivities(location);

  return (
    <>
      {/* Banner Section */}
      <Carousel slides={slidesData.slides} />

      {/* Main Content */}
      <div className="container mx-auto py-14">
        <CategorySection categories={categoriesData} />
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(
            ([tagGroup, { activities: groupActivities, tags, description }]) => (
              <TagGroup
                key={tagGroup}
                title={capitalise(tagGroup)}
                description={description}
                tags={tags}
                activities={groupActivities}
              />
            )
          )
        ) : (
          <p className="text-center text-gray-600">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;

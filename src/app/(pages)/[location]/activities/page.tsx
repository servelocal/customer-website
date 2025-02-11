import TagGroup from '@/components/TagGroup';
import CategorySection from '@/components/CategorySection/CategorySection';
import Carousel from '@/components/Carousel';
import { capitalise } from '@/utils/capitalise';
import { categoriseByTagGroups } from '@/utils/fetchActivities';
import { ActivitiesPageParams } from '@/types/pageParams';
import slidesData from '@/data/carousel.json';
import CategoryData from '@/data/categories.json';
import { fetchActivityCardData } from '@/utils/queries/fetchActivityCardData';
import { fetchTagGroups } from '@/utils/queries/fetchTagGroup';

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const activities = await fetchActivityCardData(capitalise(location));
  const tagGroups = await fetchTagGroups();
  const groupedActivity = categoriseByTagGroups(activities, tagGroups);

  return (
    <>
      {/* Banner Section */}
      <Carousel slides={slidesData.slides} />

      <h1>Alex server rendering</h1>

      {/* Main Content */}
      <div className="container mx-auto py-14">
        <CategorySection categories={CategoryData.categories} />

        {Object.keys(groupedActivity).length > 0 ? (
          Object.entries(groupedActivity).map(([tag_title, data], index) => (
            <TagGroup
              key={index}
              tagData={{ tag_title, tags: data.tags, description: data.description }}
              activityData={data.activities}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;

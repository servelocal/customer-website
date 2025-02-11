import TagGroup from '@/components/TagGroup';
import CategorySection from '@/components/CategorySection/CategorySection';
import Carousel from '@/components/Carousel';
import { capitalise } from '@/utils/capitalise';
import fetchActivities, { categoriseByTagGroups } from '@/utils/fetchActivities';
import { ActivitiesPageParams } from '@/types/pageParams';
import slidesData from '@/data/carousel.json';
import CategoryData from '@/data/categories.json';
import { fetchActivity } from '@/utils/queries/fetchActivity';
import { fetchTagGroups } from '@/utils/queries/fetchTagGroup';
// import { fetchTagGroups } from '@/utils/queries/fetchTagGroup';
// import DBTagGroup from '@/components/DBTagGroup';

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const activities = await fetchActivity(capitalise(location));
  const tagGroups = await fetchTagGroups();

  const groupedActivity = categoriseByTagGroups(activities, tagGroups);

  console.log('groupedActivity', groupedActivity);

  return (
    <>
      {/* Banner Section */}
      <Carousel slides={slidesData.slides} />

      <h1>Alex server rendering</h1>

      {/* Main Content */}
      <div className="container mx-auto py-14">
        <CategorySection categories={CategoryData.categories} />

        {Object.keys(groupedActivity).length > 0 ? (
          Object.entries(groupedActivity).map(([groupTitle, data], index) => (
            <TagGroup
              key={index}
              tagData={{ groupTitle, tags: data.tags, description: data.description }}
              activityData={data.activities}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No activities found for this location.</p>
        )}

        {/* {Object.entries(groupedActivity).length > 0 ? (
          Object.entries(groupedActivity).map(
            ([tagGroup, { activities: groupActivities, tags, description }]) => (
              <div>gello</div>
              // <TagGroup
              //   key={tagGroup}
              //   title={capitalise(tagGroup)}
              //   description={description}
              //   tags={tags}
              //   activities={groupActivities}
              // />
              // <DBTagGroup tagData={}/>
            )
          )
        ) : (
          <p className="text-center text-gray-600">No activities found for this location.</p>
        )} */}
      </div>
    </>
  );
};

export default ActivitiesPage;

// import DBActivityCard from '@/components/DBActivityCard/DBActivityCard';
// import { fetchActivity } from '@/utils/queries/fetchActivity';

// export default async function Users() {
//   const activities = await fetchActivity();
//   console.log('Users fetched from DB:', activities);
//   const result = Object.groupBy(activities, ({ category_name }) => category_name);
//   return (
//     <div>
//       {activities.map((activity) => (
//         <DBActivityCard key={activity.activity_id} data={activity} />
//       ))}
//     </div>
//   );
// }

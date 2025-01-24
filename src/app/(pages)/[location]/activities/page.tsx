import CategorySection from '@/components/CategorySection';
import { capitalise } from '@/utils/capitalise';
import fetchActivities from '@/utils/fetchActivities';
import { ActivitiesPageParams } from '@/types/pageParams';
import Carousel from '@/components/Carousel';

const DEFAULT_BACKGROUND_IMAGE = '/images/bg.svg';
const slides = [
  {
    src: DEFAULT_BACKGROUND_IMAGE,
    alt: 'Slide 1',
    title: 'Welcome to Paradise',
    description: 'Experience the serenity of golden beaches and crystal-clear waters.',
  },
  {
    src: '/images/bg2.svg',
    alt: 'Slide 2',
    title: 'Adventure Awaits',
    description: 'Discover the thrill of mountain hikes and river rafting.',
  },
  {
    src: DEFAULT_BACKGROUND_IMAGE,
    alt: 'Slide 3',
    title: 'Urban Escapes',
    description: 'Explore vibrant cityscapes and cultural landmarks.',
  },
];
const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const activities = await fetchActivities(location);

  return (
    <>
      {/* Banner Section */}
      <Carousel slides={slides} />

      {/* Main Content */}
      <div className="container mx-auto py-8">
        {Object.entries(activities).length > 0 ? (
          Object.entries(activities).map(
            ([tagGroup, { activities: groupActivities, tags, description }]) => (
              <CategorySection
                key={tagGroup}
                title={capitalise(tagGroup)}
                description={description}
                tags={tags}
                activities={groupActivities}
              />
            )
          )
        ) : (
          <p className="text-center text-gray-300">No activities found for this location.</p>
        )}
      </div>
    </>
  );
};

export default ActivitiesPage;

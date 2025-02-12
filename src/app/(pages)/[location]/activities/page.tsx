import CategorySection from '@/components/CategorySection/CategorySection';
import Carousel from '@/components/Carousel';
import { ActivitiesPageParams } from '@/types/pageParams';
import slidesData from '@/data/carousel.json';
import CategoryData from '@/data/categories.json';
import { Suspense } from 'react';
import TagGroup from '@/components/TagGroup';
import { capitalise } from '@/utils/capitalise';
import { fetchCategoriesByTagGroups } from '@/utils/queries/fetchCategoriseByTagGroups';

const ActivitiesPage = async ({ params }: { params: ActivitiesPageParams }) => {
  const { location } = await params;

  const groupedData = await fetchCategoriesByTagGroups(capitalise(location));
  const sortedData = groupedData
    .filter((data) => Array.isArray(data.activities) && data.activities.length > 0) // Ensure activities is a valid array and not empty
    .sort((a, b) => (b.activities?.length || 0) - (a.activities?.length || 0)); // Safe sorting with proper fallback

  return (
    <>
      <Carousel slides={slidesData.slides} />

      <div className="container mx-auto py-14">
        <CategorySection categories={CategoryData.categories} />

        <Suspense
          fallback={<p className="bg-pink test-[2rem] h-[20rem] w-[20rem]">loading please wait</p>}
        >
          {sortedData.length > 0 ? (
            sortedData.map((data) => <TagGroup key={data.tag_group_id} groupedData={data} />)
          ) : (
            <p className="text-center text-gray-600">No activities found for this location.</p>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default ActivitiesPage;

import ExtendedCard from '@/components/CardExtended/CardExtended';
import activitiesData from '@/data/activities.json';
import { Activity } from '@/types';
import { CategoryParams } from '@/types/pageParams';
import { unslugify } from '@/utils/slugify';

const CategoryPage = async ({ params }: { params: CategoryParams }) => {
  const { category_slug } = await params;

  const activities = activitiesData.activities.filter(
    (act: Activity) => act.category === unslugify(category_slug)
  );

  console.log(activities);

  return (
    <div className="container mx-auto mt-12 p-4">
      <h1 className="text-4xl font-bold">{unslugify(category_slug)}</h1>
      <hr className="my-8 h-px border-0 bg-gray-900 dark:bg-gray-300" />
      <div className="flex flex-col gap-4">
        {activities.map(
          ({
            activity_id,
            slug,
            name,
            description,
            sub_category,
            details: { bannerImage, thumbnailImage, price },
            coordinates,
          }) => (
            <ExtendedCard
              key={activity_id}
              slug={slug}
              name={name}
              description={description}
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
};

export default CategoryPage;

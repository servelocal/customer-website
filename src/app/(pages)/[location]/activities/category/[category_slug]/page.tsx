import ExtendedCard from '@/components/ActivityCard/ActivityCardExtended';
import activitiesData from '@/data/activities.json';
import { ActivityProps } from '@/types';
import { CategoryParams } from '@/types/pageParams';
import { unslugify } from '@/utils/slugify';

const CategoryPage = async ({ params }: { params: CategoryParams }) => {
  const { category_slug } = await params;

  const activities = activitiesData.activities.filter(
    (act: ActivityProps) => act.category === unslugify(category_slug)
  );

  return (
    <div className="container mx-auto mt-12 p-4">
      <h1 className="text-4xl font-bold">{unslugify(category_slug)}</h1>
      <hr className="my-8 h-px border-0 bg-gray-900 dark:bg-gray-300" />
      <div className="flex flex-col gap-4">
        {activities.map((activity, i) => (
          <ExtendedCard key={i} {...activity} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

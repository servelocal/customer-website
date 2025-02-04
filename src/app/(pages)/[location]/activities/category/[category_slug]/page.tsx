import { notFound } from 'next/navigation';
import activitiesData from '@/data/activities.json';
import { Activity } from '@/types';
import { CategoryParams } from '@/types/pageParams';

const CategoryPage = async ({ params }: { params: CategoryParams }) => {
  const { category_slug } = await params;

  const activity = activitiesData.activities.find((act: Activity) => act.slug === category_slug);

  return <div className="container mx-auto mt-12 p-4">{category_slug}</div>;
};

export default CategoryPage;

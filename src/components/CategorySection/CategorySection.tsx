import Category, { CategoryProps } from './Category';
interface CategorySectionProps {
  categories: CategoryProps[];
}
const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <div className="mb-8">
      <h1 className="mb-1 text-3xl font-bold capitalize">Explore popular categories</h1>
      <p className="mb-6 text-gray-500">
        See what other travellers like to do, based on ratings and number of bookings.
      </p>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <Category key={category.id} name={category.name} icon={category.icon} />
        ))}
      </div>
      <hr className="my-14 h-px border-0 bg-gray-300 dark:bg-gray-300" />
    </div>
  );
};

export default CategorySection;

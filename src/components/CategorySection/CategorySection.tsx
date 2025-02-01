import Category, { CategoryProps } from './Category';
interface CategorySectionProps {
  categories: CategoryProps[];
}
const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <div className="flex gap-4">
      <h1>Looking for something</h1>
      {categories.map((category) => (
        <Category key={category.id} name={category.name} icon={category.icon} />
      ))}
    </div>
  );
};

export default CategorySection;

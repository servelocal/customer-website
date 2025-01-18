const CategorySection = ({ category, activities, tags }: CategorySectionProps) => {
  return (
    <div className="group relative mb-8">
      {/* Category Title with Tags */}
      <div className="relative inline-block">
        {/* Title Wrapper for Full Hover */}
        <div className="group/title relative inline-block">
          <h2 className="flex items-center align-baseline text-2xl font-semibold transition-colors duration-300 hover:cursor-pointer">
            {category}

            {/* Arrow (visible only on section hover) */}
            <span
              className="ml-2 translate-x-[-10px] transform text-gray-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gray-800 group-hover:opacity-100"
              aria-hidden="true"
            >
              <MdKeyboardArrowRight />
            </span>
          </h2>

          {/* Sliding Tags (visible when hovering over any part of the title) */}
          <div className="absolute left-full top-1/2 ml-2 flex translate-x-[-10px] translate-y-[-50%] flex-nowrap gap-2 opacity-0 transition-all duration-500 group-hover/title:translate-x-0 group-hover/title:opacity-100">
            {tags.map((tag) => (
              <span
                key={tag}
                className="shrink-0 whitespace-nowrap rounded-full bg-black/10 px-3 py-1 text-sm font-medium text-black/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="mt-4 flex flex-wrap gap-4">
        {activities.map(
          ({
            activity_id,
            slug,
            name,
            sub_category,
            details: { bannerImage, thumbnailImage, price },
            coordinates,
          }) => (
            <ActivityCard
              key={activity_id}
              slug={slug}
              name={name}
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

import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { ActivityCardData, TagGroupData } from '@/types';

type CategorisedActivities = Record<
  string,
  { activities: ActivityCardData[]; tags: string[]; description: string | undefined }
>;

export const categoriseByTagGroups = (
  activities: ActivityCardData[],
  tagGroups: TagGroupData[]
): CategorisedActivities => {
  if (!activities.length) return {};

  return tagGroups.reduce<CategorisedActivities>((categories, tagGroup) => {
    const { tag_title, tags, description } = tagGroup;
    const filteredActivities = activities.filter((activity) =>
      activity.tags.some((tag) => tags.includes(tag))
    );

    if (filteredActivities.length > 0) {
      categories[tag_title] = {
        activities: filteredActivities,
        tags,
        description,
      };
    }

    return categories;
  }, {});
};

// const fetchActivities = async (
//   location: string
// ): Promise<Record<string, { activities: Activity[]; tags: string[]; description: string }>> => {
//   const lowercasedCity = location.toLowerCase();

//   if (
//     !activitiesData.location ||
//     !activitiesData.activities ||
//     !Array.isArray(tagGroupsData.tagGroups)
//   ) {
//     console.error('Invalid activities or tag groups data structure');
//     return {};
//   }

//   if (activitiesData.location.toLowerCase() === lowercasedCity) {
//     return categoriseByTagGroups(activitiesData.activities, tagGroupsData.tagGroups);
//   }

//   return {};
// };

// export default fetchActivities;

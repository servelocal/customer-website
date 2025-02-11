import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { ActivityCardData, TagGroup, Tags } from '@/types';

type CategorisedActivities = Record<
  string,
  { activities: ActivityCardData[]; tags: Tags[]; description: string | undefined }
>;

export const categoriseByTagGroups = (
  activities: ActivityCardData[],
  tagGroups: TagGroup[]
): CategorisedActivities => {
  return tagGroups.reduce<CategorisedActivities>((categories, tagGroup) => {
    const { tag_title, tags, description } = tagGroup;

    const filteredActivities = activities.filter((activity) =>
      activity.tags.some((tag) => tags.includes(tag))
    );

    categories[tag_title] = {
      activities: filteredActivities,
      tags,
      description,
    };

    console.log('dflgkjdflkgjdlkf', categories);
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

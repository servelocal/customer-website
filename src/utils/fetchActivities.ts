import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { Activity, ActivityCardData, TagGroup } from '@/types';

export const categoriseByTagGroups = (
  activities: ActivityCardData[],
  tagGroups: TagGroup[]
): Record<string, { activities: Activity[]; tags: string[]; description: string }> => {
  return tagGroups.reduce(
    (
      acc: Record<string, { activities: Activity[]; tags: string[]; description: string }>,
      group
    ) => {
      // Find activities that match the tags in the current group
      const matchedActivities = activities.filter((activity) =>
        activity.tags.some((tag) => group.tags.includes(tag))
      );

      // Add activities, tags, and description to the group
      acc[group.tag_title] = {
        activities: matchedActivities,
        tags: group.tags,
        description: group.description, // Include the description
      };

      return acc;
    },
    {}
  );
};

const fetchActivities = async (
  location: string
): Promise<Record<string, { activities: Activity[]; tags: string[]; description: string }>> => {
  const lowercasedCity = location.toLowerCase();

  if (
    !activitiesData.location ||
    !activitiesData.activities ||
    !Array.isArray(tagGroupsData.tagGroups)
  ) {
    console.error('Invalid activities or tag groups data structure');
    return {};
  }

  if (activitiesData.location.toLowerCase() === lowercasedCity) {
    return categoriseByTagGroups(activitiesData.activities, tagGroupsData.tagGroups);
  }

  return {};
};

export default fetchActivities;

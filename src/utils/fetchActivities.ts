import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { Activity, TagGroup } from '@/types';

const categoriseByTagGroups = (
  activities: Activity[],
  tagGroups: TagGroup[]
): Record<string, { activities: Activity[]; tags: string[] }> => {
  return tagGroups.reduce(
    (acc: Record<string, { activities: Activity[]; tags: string[] }>, group) => {
      // Find activities that match the tags in the current group
      const matchedActivities = activities.filter((activity) =>
        activity.tags.some((tag) => group.tags.includes(tag))
      );

      // Add activities and tags to the group
      acc[group.title] = {
        activities: matchedActivities,
        tags: group.tags, // Include the tags for the group
      };

      return acc;
    },
    {}
  );
};

const fetchActivities = async (
  location: string
): Promise<Record<string, { activities: Activity[]; tags: string[] }>> => {
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

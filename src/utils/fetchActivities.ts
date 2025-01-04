import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { Activity, TagGroup } from '@/types';

const categoriseByTagGroups = (
  activities: Activity[],
  tagGroups: TagGroup[]
): Record<string, Activity[]> => {
  return tagGroups.reduce((acc: Record<string, Activity[]>, group) => {
    const matchedActivities = activities.filter((activity) =>
      activity.tags.some((tag) => group.tags.includes(tag))
    );

    acc[group.title] = matchedActivities;
    return acc;
  }, {});
};

const fetchActivities = async (location: string): Promise<Record<string, Activity[]>> => {
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

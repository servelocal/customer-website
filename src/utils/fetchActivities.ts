import activitiesData from '@/data/activities.json';
import tagGroupsData from '@/data/tagGroups.json';
import { ActivityCardData, TagGroupData, Tag } from '@/types';

type CategorisedActivities = Record<
  string,
  { activities: ActivityCardData[]; tags: Tag[]; description: string | undefined }
>;

export const categoriseByTagGroups = (
  activities: ActivityCardData[],
  tagGroups: TagGroupData[]
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

    return categories;
  }, {});
};

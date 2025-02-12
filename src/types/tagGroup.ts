import { Activity } from './activities';

export interface CategoriesByTagGroups {
  tag_group_id: string;
  tag_title: string;
  description: string;
  tags: string[];
  activities?: Activity[];
}

export interface TagGroupProps {
  groupedData: CategoriesByTagGroups;
}

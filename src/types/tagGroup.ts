import { Tag } from './activities';

export interface TagGroupData {
  tag_group_id: string;
  tag_title: string;
  description?: string | undefined;
  tags: Tag[];
}

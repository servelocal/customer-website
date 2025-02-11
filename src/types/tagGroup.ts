import { Tags } from './activities';

export interface TagGroup {
  tag_group_id: string;
  tag_title: string;
  description?: string | undefined;
  tags: Tags[];
}

// import { Tag } from './activities';
export interface ImageData {
  banner_image?: string;
  thumbnail_image?: string;
}

export interface Activity {
  activity_id: string;
  activity_name: string;
  tags: string[];
  category_name: string;
  sub_category_name: string;
  post_code: string;
  latitude: number;
  longitude: number;
  images?: ImageData;
  slug: string;
}

export interface TagGroupData {
  tag_group_id: string;
  tag_title: string;
  description: string;
  tags: string[];
  activities?: Activity[];
}

export type CategoriesByTagGroups = TagGroupData[];

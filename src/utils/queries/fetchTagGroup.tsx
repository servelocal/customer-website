import { TagGroup, Tags } from '@/types';
import { query } from '../db';

export async function fetchTagGroups(): Promise<TagGroup[]> {
  try {
    const data =
      await query(`select tg.tag_group_id, tg.tag_title, tg.description,  ARRAY_AGG(t.tag_name) as tags FROM tag_group tg
                  JOIN tag t on t.tag_group_id  = tg.tag_group_id
                  group by tg.tag_group_id, tg.tag_title, tg.description;`);
    console.log(data);
    return data as TagGroup[];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch from tag_group table');
  }
}

("select tg.tag_group_id, tg.title, tg.description,  ARRAY_AGG(t.name) as tags FROM tag_group tg JOIN tag t on t.tag_group_id  = tg.tag_group_idgroup by tg.tag_group_id, tg.title, tg.description'");

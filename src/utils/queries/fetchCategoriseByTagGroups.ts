// import { TagGroupData } from '@/types';
import { query } from '../db';

export async function fetchCategoriseByTagGroups(location: string) {
  try {
    const data = await query(
      `WITH ActivityData AS (
    SELECT 
        a.activity_id, 
        a.activity_name, 
        ARRAY_AGG(DISTINCT t.tag_name) FILTER (WHERE t.tag_name IS NOT NULL) AS tags, 
        cat.category_name, 
        sb.sub_category_name, 
        l.post_code, 
        l.latitude, 
        l.longitude,
        JSONB_OBJECT_AGG(
            i.image_type, i.image_url
        ) FILTER (WHERE i.image_type IN ('banner_image', 'thumbnail_image')) AS images,
        slug
    FROM activity a
    JOIN activity_location al ON al.activity_id = a.activity_id
    JOIN location l ON al.location_id = l.location_id
    JOIN city c ON l.city_id = c.city_id
    JOIN sub_category sb ON sb.sub_category_id = a.sub_category_id
    LEFT JOIN activity_image ai ON al.activity_location_id = ai.activity_location_id
    LEFT JOIN image i ON i.image_id = ai.image_id
    LEFT JOIN category cat ON cat.category_id = a.category_id
    LEFT JOIN activity_tag at ON at.activity_location_id = al.activity_location_id
    LEFT JOIN tag t ON t.tag_id = at.tag_id
    WHERE c.city_name = $1
    GROUP BY a.activity_id, a.activity_name, cat.category_name, sb.sub_category_name, l.post_code, l.latitude, l.longitude, slug
)
SELECT 
    tg.tag_group_id, 
    tg.tag_title, 
    tg.description,  
    ARRAY_AGG(DISTINCT t.tag_name) AS tags,
    JSONB_AGG(DISTINCT ad) FILTER (WHERE ad.activity_id IS NOT NULL) AS activities
FROM tag_group tg
JOIN tag t ON t.tag_group_id = tg.tag_group_id
LEFT JOIN activity_tag at ON at.tag_id = t.tag_id
LEFT JOIN activity_location al ON al.activity_location_id = at.activity_location_id  -- Ensuring correct join
LEFT JOIN ActivityData ad ON ad.activity_id = al.activity_id  -- Linking to correct activity_id
GROUP BY tg.tag_group_id, tg.tag_title, tg.description;`,
      [location]
    );
    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error("We couldn't load the tag category section");
  }
}

("select tg.tag_group_id, tg.title, tg.description,  ARRAY_AGG(t.name) as tags FROM tag_group tg JOIN tag t on t.tag_group_id  = tg.tag_group_idgroup by tg.tag_group_id, tg.title, tg.description'");

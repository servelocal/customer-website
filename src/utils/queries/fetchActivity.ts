import { query } from '../db';

export async function fetchActivity() {
  try {
    const activity =
      await query(`SELECT a.activity_id, a.name as activity_name, sb.name as sub_category_name, l.post_code, i.image_url FROM activity a
JOIN activity_location al on al.activity_id = a.activity_id
JOIN location l on al.location_id = l.location_id
JOIN sub_category sb on sb.sub_category_id = a.sub_category_id
join activity_image ai on al.activity_location_id = ai.activity_location_id
join image i on i.image_id = ai.image_id;`);
    // console.log(activity);
    return activity;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch the activities');
  }
}

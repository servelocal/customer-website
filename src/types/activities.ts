export interface LocationActivities {
  location: string;
  activities: Activity[];
}

// export interface ActivityCardData {
//   activity_id: string;
//   activity_name: string;
//   tags: string[];
//   category_name: string;
//   sub_category_name: string;
//   post_code: string;
//   latitude: number;
//   longitude: number;
//   images: Images;
//   slug: string;
// }

// export type Tag = {
//   tag_name: string;
// };

export interface ImageData {
  banner_image: string;
  thumbnail_image: string;
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
  images: ImageData;
  slug: string;
}

export interface ActivityCardProps {
  activityData: Activity;
}

export interface ActivityDetails {
  openingTimes: OpeningTimes;
  price: Price[];
  bannerImage: string;
  thumbnailImage: string;
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Price {
  type: string;
  amount: number;
  currency: string;
}

export interface Contact {
  phone: string;
  website: string;
}

export interface OpeningTimes {
  Weekdays?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
  [key: string]: string | undefined;
}

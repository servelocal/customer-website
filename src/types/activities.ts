export interface LocationActivities {
  location: string;
  activities: Activity[];
}

export interface ActivityCardProps {
  activity_id: number;
  slug: string;
  name: string;
  priceRange: string;
  thumbnailImage: string;
  bannerImage: string;
  subCategory: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Activity {
  activity_id: number;
  slug: string;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  tags: string[];
  address: string;
  contact: Contact;
  details: ActivityDetails;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Contact {
  phone: string;
  website: string;
}

export interface ActivityDetails {
  openingTimes: OpeningTimes;
  priceRange: string;
  bannerImage: string;
  thumbnailImage: string;
}

export interface OpeningTimes {
  Weekdays?: string;
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
  [key: string]: string | undefined;
}

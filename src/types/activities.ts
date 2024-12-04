export interface LocationActivities {
  location: string;
  activities: Activity[];
}

export interface Activity {
  activity_id: number;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  tags: string[];
  address: string;
  contact: Contact;
  details: ActivityDetails;
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
  [key: string]: string | undefined; // Allows additional days or ranges (like "Weekends" or "Daily")
}

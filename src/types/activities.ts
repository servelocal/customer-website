export interface LocationActivities {
  location: string;
  activities: Activity[];
}

export interface ActivityCardData {
  activity_id: string;
  activity_name: string;
  tags: Tags[];
  category_name: string;
  sub_Category: string;
  post_code: string;
  latitude: number;
  longitude: number;
  images: Images[];
  slug: string;
}

export interface Tags {
  tag_name: string;
}

export interface Images {
  thumbnailImage: string;
  bannerImage: string;
}

export interface Activity {
  activity_id: number;
  slug: string;
  name: string;
  category: string;
  sub_category: string;
  description: string;
  tags: string[];
  address: Address;
  contact: Contact;
  details: ActivityDetails;
  coordinates: {
    latitude: number;
    longitude: number;
  };
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

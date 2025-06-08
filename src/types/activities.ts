export interface LocationActivities {
  location: string;
  activities: Activity[];
}

export interface ActivityCardProps {
  activity_id?: number;
  slug: string;
  name: string;
  price: Price[];
  thumbnailImage: string;
  description?: string;
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
  address: AddressType;
  contact: Contact;
  details: ActivityDetails;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface ActivityDetails {
  openingTimes: OpeningTimesType;
  price: Price[];
  bannerImage: string;
  thumbnailImage: string;
}

export interface AddressType {
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

type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface TimeRange {
  open: string;
  close: string;
}

export type OpeningTimesType = {
  [day in Weekday]: TimeRange | null;
};

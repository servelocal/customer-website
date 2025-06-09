export interface LocationActivities {
  location: string;
  activities: ActivityProps[];
}

export interface ActivityProps {
  activity_id: number;
  slug: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  tags: string[];
  address: AddressType;
  contact: Contact;
  businessHours: BusinessHoursProps;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  price: Price[];
  thumbnailImage: string;
  bannerImage: string;
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

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

interface TimeRange {
  open: string;
  close: string;
}

export type BusinessHoursProps = {
  [day in Weekday]: TimeRange | null;
};
